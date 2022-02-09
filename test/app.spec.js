// const path = require('path');
// const fse = require('fs-extra');
// // const assert = require('yeoman-assert');
// const helpers = require('yeoman-test');

// describe('JHipster generator es-entity-reindexer', function () {
//     this.timeout(300000);
//     describe('Test with Maven and AngularX', () => {
//         beforeEach(async () => {
//             await helpers
//                 .run(path.join(__dirname, '../generators/app'))
//                 .inTmpDir(dir => {
//                     fse.copySync(path.join(__dirname, '../test/templates/maven-angularX'), dir);
//                 })
//                 .withOptions({
//                     testmode: true,
//                 });
//         });

//         it('generate ApplicationProperties.java file', () => {
//             this.timeout(10000);
//             // TODO For testing only
//             // assert.equal(true, true);
//             // assert.file(['ApplicationProperties.java']);
//         });
//     });

//     // TODO Doesn't support Gradle or React yet
//     // describe('Test with Gradle and React', () => {
//     //     beforeEach(async () => {
//     //         await helpers
//     //             .run(path.join(__dirname, '../generators/app'))
//     //             .inTmpDir(dir => {
//     //                 fse.copySync(path.join(__dirname, '../test/templates/gradle-react'), dir);
//     //             })
//     //             .withOptions({
//     //                 testmode: true,
//     //             })
//     //             .withPrompts({
//     //                 message: 'simple message to say hello',
//     //             });
//     //     });

//     //     it('generate dummy.txt file', () => {
//     //         assert.file(['dummy-gradle.txt', 'dummy-react.txt']);
//     //     });
//     // });

//     // TODO Doesn't support Vue yet
//     // describe('Test with Maven and Vue', () => {
//     //     beforeEach(async () => {
//     //         await helpers
//     //             .run(path.join(__dirname, '../generators/app'))
//     //             .inTmpDir(dir => {
//     //                 fse.copySync(path.join(__dirname, '../test/templates/maven-vue'), dir);
//     //             })
//     //             .withOptions({
//     //                 testmode: true,
//     //             })
//     //             .withPrompts({
//     //                 message: 'simple message to say hello',
//     //             });
//     //     });

//     //     it('generate dummy.txt file', () => {
//     //         assert.file(['dummy-maven.txt', 'dummy-vue.txt']);
//     //     });
//     // });
// });
