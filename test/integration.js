const assert = require("assert");
const path = require("path");
const { execSync } = require("child_process");

console.log("cleanup");
execSync("rm -rf test-connector");

console.log("generate test-connector");
execSync("node ./bin/hull-connector-template test-connector --non-interactive --name='Test Connector' --official");
process.chdir("./test-connector");

console.log("install dependencies");
execSync("yarn");

const generatedPackageJson = require(path.join(process.cwd(), "package.json"));
const generatedManifestJson = require(path.join(process.cwd(), "manifest.json"));

assert.equal(generatedPackageJson.name, "hull-test-connector");

assert.equal(generatedManifestJson.name, "Test Connector");
