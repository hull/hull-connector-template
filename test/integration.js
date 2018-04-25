/**
 * This test generates test-connector,
 * runs `yarn` to install all deps
 * and then `yarn test:lint` to confirm that tests pass on the
 * clean installation
 */

const assert = require("assert");
const path = require("path");
const { execSync } = require("child_process");

console.log("cleaning up...");
execSync("rm -rf test-connector");

console.log("generating test-connector...");
execSync("node ./bin/hull-connector-template test-connector --non-interactive --name='Test Connector' --official");
process.chdir("./test-connector");

console.log("installing dependencies...");
execSync("yarn");

console.log("asserting generated code...");
const generatedPackageJson = require(path.join(process.cwd(), "package.json"));
const generatedManifestJson = require(path.join(process.cwd(), "manifest.json"));

assert.equal(generatedPackageJson.name, "hull-test-connector");

assert.equal(generatedManifestJson.name, "Test Connector");

console.log("running lint tests...");
execSync("yarn test:lint");
