const chalk = require('chalk');
const semver = require('semver');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const { SERVER_MAIN_SRC_DIR, SERVER_MAIN_RES_DIR, CLIENT_MAIN_SRC_DIR } = require('generator-jhipster/generators/generator-constants');
const packagejs = require('../../package.json');

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            init(args) {
                if (args === 'default') {
                    // do something when argument is 'default'
                    this.message = 'default message';
                }
            },
            readConfig() {
                this.jhipsterAppConfig = this.getJhipsterConfig('.yo-rc.json').createProxy();
                if (!this.jhipsterAppConfig) {
                    this.error('Cannot read .yo-rc.json');
                }
            },
            displayLogo() {
                // it's here to show that you can use functions from generator-jhipster
                // this function is in: generator-jhipster/generators/generator-base.js
                this.printJHipsterLogo();

                // Have Yeoman greet the user.
                this.log(
                    `\nWelcome to the ${chalk.bold.yellow('JHipster es-entity-reindexer')} generator! ${chalk.yellow(
                        `v${packagejs.version}\n`
                    )}`
                );
            },
            checkJhipster() {
                const currentJhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
                const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
                if (!semver.satisfies(currentJhipsterVersion, minimumJhipsterVersion)) {
                    this.warning(
                        `\nYour generated project used an old JHipster version (${currentJhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`
                    );
                }
            }
        };
    }

    async prompting() {
        this.entityNames = this.getExistingEntityNames();

        const prompts = [
            {
                when: () => typeof this.entities === 'undefined',
                type: 'checkbox',
                name: 'entities',
                message: 'Which entities would you like to reindex with Elasticsearch?',
                choices: this.entityNames,
                default: this.entityNames[0]
            }
        ];

        await this.prompt(prompts).then(answers => {
            this.promptAnswers = answers;
            // To access props answers use this.promptAnswers.someOption;
        });
    }

    writing() {
        // read config from .yo-rc.json
        this.baseName = this.jhipsterAppConfig.baseName;
        this.packageName = this.jhipsterAppConfig.packageName;
        this.packageFolder = this.jhipsterAppConfig.packageFolder;
        this.clientFramework = this.jhipsterAppConfig.clientFramework;
        this.clientPackageManager = this.jhipsterAppConfig.clientPackageManager;
        this.buildTool = this.jhipsterAppConfig.buildTool;
        this.applicationType = this.jhipsterAppConfig.applicationType;
        this.nativeLanguage = this.jhipsterAppConfig.nativeLanguage;
        this.languages = this.jhipsterAppConfig.languages;
        this.searchEngine = this.jhipsterAppConfig.searchEngine; // TODO This needs to be checked EARLY and cancel whole operationg if false
        this.enableTranslation = this.jhipsterAppConfig.enableTranslation;
        this.skipClient = this.jhipsterAppConfig.skipClient;
        this.skipServer = this.jhipsterAppConfig.skipServer;
        this.skipUserManagement = this.jhipsterAppConfig.skipUserManagement;
        this.authenticationType = this.jhipsterAppConfig.authenticationType;
        this.jhiPrefixDashed = this.jhipsterAppConfig.jhiPrefix;

        // create variables based off of jhipster version
        this.appFolder = 'app/admin/elasticsearch-reindex/';
        this.serviceFolder = this.appFolder;

        // use function in generator-base.js from generator-jhipster
        this.frontendAppName = this.getFrontendAppName();

        // use constants from generator-constants.js
        const javaDir = `${SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
        const resourceDir = SERVER_MAIN_RES_DIR;
        const webappDir = CLIENT_MAIN_SRC_DIR;

        // variable from questions
        if (typeof this.entities === 'undefined') {
            this.entities = this.promptAnswers.entities; // TODO If no entities are selected we should probably exit early
        }

        // show all variables
        this.log('\n--- some config read from config ---');
        this.log(`baseName=${this.baseName}`);
        this.log(`packageName=${this.packageName}`);
        this.log(`clientFramework=${this.clientFramework}`);
        this.log(`clientPackageManager=${this.clientPackageManager}`);
        this.log(`buildTool=${this.buildTool}`);
        this.log(`applicationType=${this.applicationType}`);
        this.log(`nativeLanguage=${this.nativeLanguage}`);
        this.log(`languages=${this.languages}`);
        this.log(`searchEngine=${this.searchEngine}`);
        this.log(`enableTranslation=${this.enableTranslation}`);
        this.log(`skipClient=${this.skipClient}`);
        this.log(`skipServer=${this.skipServer}`);
        this.log(`skipUserManagement=${this.skipUserManagement}`);
        this.log(`authenticationType=${this.authenticationType}`);
        this.log(`jhiPrefixDashed=${this.jhiPrefixDashed}`);
        this.log('\n--- some function ---');
        this.log(`frontendAppName=${this.frontendAppName}`);

        this.log('\n--- some const ---');
        this.log(`javaDir=${javaDir}`);
        this.log(`resourceDir=${resourceDir}`);
        this.log(`webappDir=${webappDir}`);

        this.log('\n--- variables from questions ---');
        this.log(`Entities=${this.entities}`);
        this.log('------\n');

        // Register this generator as a dev dependency
        this.addNpmDevDependency('generator-jhipster-es-entity-reindexer', packagejs.version);
        try {
            this.registerModule(
                'generator-jhipster-es-entity-reindexer',
                'entity',
                'post',
                'app',
                'Generates code to reindex selected entities with Elasticsearch.'
            );
        } catch (err) {
            this.log(`${chalk.red.bold('WARN!')} Could not register as a jhipster entity post creation hook...\n`);
        }

        /**
         *  VALIDATE VARIABLES
         */
        if (this.entities.length === 0) {
            this.log(chalk.yellow('[WARNING] No entities were selected, generated service may fail to compile'));
        }
        if (this.searchEngine !== 'elasticsearch') {
            this.log(
                chalk.yellow(
                    'WARNING search engine is not set to Elasticsearch in JHipster configuration, ' +
                        'generated service may fail to compile'
                )
            );
        }

        /**
         *  WRITE TEMPLATES
         */
        if (!this.skipServer) {
            // this.template(
            //     'src/main/java/package/web/rest/_ElasticsearchIndexResource.java',
            //     `${this.javaDir}/web/rest/ElasticsearchIndexResource.java`,
            //     this,
            //     {}
            // );
            this.template(
                'src/main/java/package/service/_ElasticsearchIndexService.java.ejs',
                `${javaDir}/service/ElasticsearchIndexService.java`,
                this,
                {}
            );
            // TODO this might be needed for the @Time annotation
            // if (this.jhipsterMajorVersion > 5) {
            //     this.addMavenDependency('io.dropwizard.metrics', 'metrics-annotation', '4.1.2');
            // }
        }
    }

    install() {
        const logMsg = `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;

        const injectDependenciesAndConstants = err => {
            if (err) {
                this.warning('Install of dependencies failed!');
                this.log(logMsg);
            }
        };
        const installConfig = {
            bower: false,
            npm: this.clientPackageManager !== 'yarn',
            yarn: this.clientPackageManager === 'yarn',
            callback: injectDependenciesAndConstants
        };
        this.log(chalk.blue(`Install Config: ${installConfig}`));

        if (this.options['skip-install']) {
            this.log(logMsg);
        } else {
            // TODO figure out how to installDependencies
            // this.installDependencies(installConfig);
        }
    }

    end() {
        this.log('End of es-entity-reindexer generator');
    }
};
