/**
 * Runs the generator and some yarn commands to confirm that we didn't break anything
 * in the boilercode. Follow comments to see what each step does
 */

const assert = require("assert");
const path = require("path");
const { execSync } = require("child_process");

/**
 * Make sure we don't have anything left from previous test
 */
console.log(">>> cleaning up...");
execSync("rm -rf test-connector");

/**
 * Run `hull-connector-template` to generate `test-connector`
 */
console.log(">>> generating test-connector...");
execSync("node ./bin/hull-connector-template test-connector --non-interactive --name='Test Connector' --official");
process.chdir("./test-connector");

/**
 * Install only production dependencies,
 * this step runs also build the front-end and back-end application.
 * This is what happens on Heroku deployment
 */
console.log(">>> installing production dependencies...");
execSync("yarn --production");

/**
 * Make sure the template was successfully generated
 */
console.log(">>> asserting generated code...");
const generatedPackageJson = require(path.join(process.cwd(), "package.json"));
const generatedManifestJson = require(path.join(process.cwd(), "manifest.json"));

assert.equal(generatedPackageJson.name, "hull-test-connector");

assert.equal(generatedManifestJson.name, "Test Connector");

/**
 * Now install additional development dependencies
 */
console.log(">>> installing development dependencies...");
execSync("yarn");


/**
 * And run linting. `yarn test` would fail now, since we don't have full coverage in example test yet
 */
console.log(">>> running lint tests...");
execSync("yarn test:lint");
