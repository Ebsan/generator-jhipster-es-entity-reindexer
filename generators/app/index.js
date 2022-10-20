const chalk = require('chalk');
const semver = require('semver');
const fs = require('fs');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const { SERVER_MAIN_SRC_DIR, CLIENT_MAIN_SRC_DIR, MAIN_DIR } = require('generator-jhipster/generators/generator-constants');
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
            },
        };
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
        this.searchEngine = this.jhipsterAppConfig.searchEngine;
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
        const webappDir = CLIENT_MAIN_SRC_DIR;

        this.entities = this.getExistingEntityNames();

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
            this.log(chalk.red('[ERROR] search engine is not set to Elasticsearch in JHipster configuration, nothing to generate'));
            this.async(new Error());
        }

        /**
         *  WRITE TEMPLATES
         */

        const appyamlDestination = `${MAIN_DIR}/resources/config/application.yml`;
        let applicationFile = fs.readFileSync(appyamlDestination, 'utf-8');
        this.render('src/main/resources/config/_application.yml.ejs', res => {
            applicationFile += res;
            fs.writeFileSync(appyamlDestination, applicationFile);
        });

        if (!this.skipServer) {
            this.template(
                'src/main/java/package/web/rest/_ElasticsearchIndexResource.java.ejs',
                `${javaDir}/web/rest/ElasticsearchIndexResource.java`,
                this,
                {}
            );
            this.template(
                'src/main/java/package/service/_ElasticsearchIndexService.java.ejs',
                `${javaDir}/service/ElasticsearchIndexService.java`,
                this,
                {}
            );
            this.template(
                'src/main/java/package/config/_ApplicationProperties.java.ejs',
                `${javaDir}/config/ApplicationProperties.java`,
                this,
                {}
            );
            this.addMavenDependency('io.dropwizard.metrics', 'metrics-annotation', null);
        }

        if (!this.skipClient) {
            this.template(
                'src/main/webapp/app/admin/elasticsearch-reindex/_elasticsearch-reindex-modal.component.html.ejs',
                `${webappDir}${this.appFolder}/elasticsearch-reindex-modal.component.html`,
                this,
                {}
            );
            this.template(
                'src/main/webapp/app/admin/elasticsearch-reindex/_elasticsearch-reindex-modal.component.ts.ejs',
                `${webappDir}${this.appFolder}/elasticsearch-reindex-modal.component.ts`,
                this,
                {}
            );
            this.template(
                'src/main/webapp/app/admin/elasticsearch-reindex/_elasticsearch-reindex-selected-modal.component.ts.ejs',
                `${webappDir}${this.appFolder}/elasticsearch-reindex-selected-modal.component.ts`,
                this,
                {}
            );
            this.template(
                'src/main/webapp/app/admin/elasticsearch-reindex/_elasticsearch-reindex.component.html.ejs',
                `${webappDir}${this.appFolder}/elasticsearch-reindex.component.html`,
                this,
                {}
            );
            this.template(
                'src/main/webapp/app/admin/elasticsearch-reindex/_elasticsearch-reindex.component.ts.ejs',
                `${webappDir}${this.appFolder}/elasticsearch-reindex.component.ts`,
                this,
                {}
            );
            this.template(
                'src/main/webapp/app/admin/elasticsearch-reindex/_elasticsearch-reindex.module.ts.ejs',
                `${webappDir}${this.appFolder}/elasticsearch-reindex.module.ts`,
                this,
                {}
            );
            this.template(
                'src/main/webapp/app/admin/elasticsearch-reindex/_elasticsearch-reindex.route.ts.ejs',
                `${webappDir}${this.appFolder}/elasticsearch-reindex.route.ts`,
                this,
                {}
            );
            this.template(
                'src/main/webapp/app/admin/elasticsearch-reindex/_elasticsearch-reindex.service.ts.ejs',
                `${webappDir}${this.appFolder}/elasticsearch-reindex.service.ts`,
                this,
                {}
            );
            this.template(
                'src/main/webapp/app/admin/elasticsearch-reindex/_index.ts.ejs',
                `${webappDir}${this.appFolder}/index.ts`,
                this,
                {}
            );
            if (this.addAdminToModule) {
                this.addAdminToModule(
                    this.baseName,
                    'ElasticsearchReindex',
                    'elasticsearch-reindex',
                    'elasticsearch-reindex',
                    this.enableTranslation,
                    this.clientFramework
                );
            } else {
                this.log(
                    chalk.yellow(
                        '[WARNING] the function addAdminToModule is missing, you need to add the missing import in src/main/webapp/app/admin/admin-routing.module.ts:'
                    )
                );
                this.log(
                    // eslint-disable-next-line prefer-template
                    chalk.yellow('  - at the beginning of the file: ') +
                        'import { ' +
                        this.baseName +
                        // eslint-disable-next-line quotes
                        "ElasticsearchReindexModule } from './elasticsearch-reindex/elasticsearch-reindex.module';"
                );
                this.log(`${chalk.yellow('  - inside @NgModule, imports: ') + this.baseName}ElasticsearchReindexModule\n`);
            }
            if (this.addElementToAdminMenu) {
                const iconName = 'search';
                const routePrefix = 'admin/';
                const routeKey = 'elasticsearch-reindex';
                this.addElementToAdminMenu(routePrefix + routeKey, iconName, this.enableTranslation, this.clientFramework, routeKey);
                if (this.enableTranslation) {
                    this.languages.forEach(language => {
                        this.addAdminElementTranslationKey(routeKey, 'Reindex Elasticsearch', language);
                    });
                }
            }
            if (this.addAdminRoute) {
                this.addAdminRoute(
                    'elasticsearch-reindex',
                    './elasticsearch-reindex/elasticsearch-reindex.module',
                    `${this.baseName}ElasticsearchReindexModule`
                );
            } else {
                this.log(
                    chalk.yellow(
                        '[WARNING] the function addAdminRoute is missing, you need to add the missing route to src/main/webapp/app/admin/admin-routing.module.ts'
                    )
                );
            }
            if (this.enableTranslation) {
                this.languages.forEach(language => {
                    this.template(
                        'src/main/webapp/i18n/elasticsearch-reindex.json.ejs',
                        `${webappDir}i18n/${language}/elasticsearch-reindex.json`,
                        this,
                        {}
                    );
                });
            }
        }
    }

    end() {
        this.log(
            chalk.blue(
                'Added a new property to ApplicationProperties.java. Make sure to add a value for application.elasticsearch.reindex-on-startup (true|false) to your application.yml file.'
            )
        );
        this.log('End of es-entity-reindexer generator');
    }
};
