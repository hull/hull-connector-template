const _ = require("lodash");
const inquirer = require("inquirer");

function promptUser(argv, existingManifestJson, existingPackageJson) {

  function showQuestion(answers) {
    if (argv["non-interactive"]) {
      return false;
    }
    if (answers.alter_config === "skip") {
      return false;
    }
    return true;
  }

  return inquirer.prompt([{
    type: "list",
    name: "alter_config",
    message: "Existing connector package.json and manifest.json found, do you want to update some values or skip to diff?",
    choices: ["update", "skip"],
    when: showQuestion
  }, {
    type: "text",
    name: "name",
    message: "Connector human redable name (e.g. 'Intercom')",
    validate: function (input) { return input.match(/[a-zA-Z][a-zA-Z0-9]+/) !== null; },
    default: existingManifestJson.name,
    when: showQuestion
  }, {
    type: "confirm",
    name: "official",
    message: "Is this an official Hull connector?",
    default: (answers) => existingPackageJson.name ? existingPackageJson.name.startsWith("hull-") : false,
    when: showQuestion
  }, {
    type: "text",
    name: "package_name",
    message: "Package name",
    default: (data) => existingPackageJson.name || data.official === true ? `hull-${_.kebabCase(data.name)}` : _.kebabCase(data.name),
    when: showQuestion
  }, {
    type: "text",
    name: "homepage_url",
    message: "Homepage url",
    default: (data) => existingPackageJson.homepage || data.official === true ? `https://github.com/hull-ships/hull-${_.kebabCase(data.name)}` : null,
    when: showQuestion
  }, {
    type: "text",
    name: "repository_url",
    message: "Repository url",
    default: (data) => {
      return (existingPackageJson.repository && existingPackageJson.repository.url)
        || data.official === true ? `git://github.com/hull-ships/hull-${_.kebabCase(data.name)}` : null;
    },
    when: showQuestion
  }, {
    type: "text",
    name: "bugs_url",
    message: "Bugs url",
    default: (data) => {
      return (existingPackageJson.bugs && existingPackageJson.bugs.url)
        || data.official === true ? `https://github.com/hull-ships/hull-${_.kebabCase(data.name)}/issues` : null;
    },
    when: showQuestion
  }])
}
module.exports = promptUser;
