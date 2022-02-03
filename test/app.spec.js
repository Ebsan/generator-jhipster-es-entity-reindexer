const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('JHipster generator es-entity-reindexer', () => {
    describe('Test with Maven and AngularX', () => {
        beforeEach(async () => {
            await helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/maven-angularX'), dir);
                })
                .withOptions({
                    testmode: true,
                })
                .withPrompts({
                    message: 'simple message to say hello',
                });
        });

        it('generate dummy.txt file', () => {
            assert.file(['dummy-maven.txt', 'dummy-angularX.txt']);
        });
    });

    describe('Test with Gradle and React', () => {
        beforeEach(async () => {
            await helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/gradle-react'), dir);
                })
                .withOptions({
                    testmode: true,
                })
                .withPrompts({
                    message: 'simple message to say hello',
                });
        });

        it('generate dummy.txt file', () => {
            assert.file(['dummy-gradle.txt', 'dummy-react.txt']);
        });
    });

    describe('Test with Maven and Vue', () => {
        beforeEach(async () => {
            await helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/maven-vue'), dir);
                })
                .withOptions({
                    testmode: true,
                })
                .withPrompts({
                    message: 'simple message to say hello',
                });
        });

        it('generate dummy.txt file', () => {
            assert.file(['dummy-maven.txt', 'dummy-vue.txt']);
        });
    });
});
