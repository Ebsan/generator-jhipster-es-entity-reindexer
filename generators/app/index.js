const chalk = require('chalk');
const semver = require('semver');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const {
    SERVER_MAIN_SRC_DIR,
    SERVER_MAIN_RES_DIR,
    CLIENT_MAIN_SRC_DIR,
    SUPPORTED_CLIENT_FRAMEWORKS
} = require('generator-jhipster/generators/generator-constants');
const packagejs = require('../../package.json');

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            // init(args) {
            //     if (args === 'default') {
            //         // do something when argument is 'default'
            //         this.message = 'default message';
            //     }
            // },
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

        // use function in generator-base.js from generator-jhipster
        this.frontendAppName = this.getFrontendAppName();

        // use constants from generator-constants.js
        const javaDir = `${SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
        const resourceDir = SERVER_MAIN_RES_DIR;
        const webappDir = CLIENT_MAIN_SRC_DIR;

        // variable from questions
        if (typeof this.entities === 'undefined') {
            this.entities = this.promptAnswers.entities;
        }

        // show all variables
        this.log('\n--- some config read from config ---');
        this.log(`baseName=${this.baseName}`);
        this.log(`packageName=${this.packageName}`);
        this.log(`clientFramework=${this.clientFramework}`);
        this.log(`clientPackageManager=${this.clientPackageManager}`);
        this.log(`buildTool=${this.buildTool}`);

        this.log('\n--- some function ---');
        this.log(`frontendAppName=${this.frontendAppName}`);

        this.log('\n--- some const ---');
        this.log(`javaDir=${javaDir}`);
        this.log(`resourceDir=${resourceDir}`);
        this.log(`webappDir=${webappDir}`);

        this.log('\n--- variables from questions ---');
        this.log(`Entities=${this.entities}`);
        this.log('------\n');

        if (Object.values(SUPPORTED_CLIENT_FRAMEWORKS).includes(this.clientFramework)) {
            this.template('dummy.txt', `dummy-${this.clientFramework}.txt`);
        }

        if (this.buildTool === 'maven') {
            this.template('dummy.txt', 'dummy-maven.txt');
        } else if (this.buildTool === 'gradle') {
            this.template('dummy.txt', 'dummy-gradle.txt');
        }

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
    }

    // install() {
    //     const logMsg = `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;

    //     const injectDependenciesAndConstants = err => {
    //         if (err) {
    //             this.warning('Install of dependencies failed!');
    //             this.log(logMsg);
    //         }
    //     };
    //     const installConfig = {
    //         bower: false,
    //         npm: this.clientPackageManager !== 'yarn',
    //         yarn: this.clientPackageManager === 'yarn',
    //         callback: injectDependenciesAndConstants
    //     };
    //     if (this.options['skip-install']) {
    //         this.log(logMsg);
    //     } else {
    //         this.installDependencies(installConfig);
    //     }
    // }

    end() {
        this.log('End of es-entity-reindexer generator');
    }
};
