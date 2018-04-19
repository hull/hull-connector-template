const _ = require("lodash");

function combineData(userAnswers, argv, existingManifestJson, existingPackageJson) {

  // this is data with user cannot override
  // we set version of connector package.json to what we found
  // or we default to "0.0.1"
  const forcedData = {
    version: existingPackageJson.version || "0.0.1",
    template_version: require("./../package.json").version
  };

  // if we were run with non-interactive flag pick all data from argv
  if (argv["non-interactive"]) {
    userAnswers = {
      name: argv.name,
      official: argv.official,
      package_name: argv.official === true ? `hull-${_.kebabCase(argv.name)}` : _.kebabCase(argv.name),
      homepage_url: argv.official === true ? `https://github.com/hull-ships/hull-${_.kebabCase(argv.name)}` : argv.homepage_url,
      repository_url: argv.official === true ? `git://github.com/hull-ships/hull-${_.kebabCase(argv.name)}` : argv.repository_url,
      bugs_url: argv.official === true ? `https://github.com/hull-ships/hull-${_.kebabCase(argv.name)}/issues` : argv.bugs_url
    };
  }

  // if we were run over existing installation and we are using existing configuration
  if (userAnswers.alter_config === "skip") {
    userAnswers = {
      name: existingManifestJson.name,
      official: existingPackageJson.name ? existingPackageJson.name.startsWith("hull-") : false
    };
    userAnswers.package_name = existingPackageJson.name || userAnswers.official === true
      ? `hull-${_.kebabCase(userAnswers.name)}` : _.kebabCase(userAnswers.name);
    userAnswers.homepage_url = existingPackageJson.homepage || userAnswers.official === true
      ? `https://github.com/hull-ships/hull-${_.kebabCase(userAnswers.name)}` : null;
    userAnswers.repository_url = (existingPackageJson.repository && existingPackageJson.repository.url)
        || userAnswers.official === true ? `git://github.com/hull-ships/hull-${_.kebabCase(userAnswers.name)}` : null;
    userAnswers.bugs_url = (existingPackageJson.bugs && existingPackageJson.bugs.url)
        || userAnswers.official === true ? `https://github.com/hull-ships/hull-${_.kebabCase(userAnswers.name)}/issues` : null;
  }

  return _.defaults({}, forcedData, userAnswers);
}

module.exports = combineData;
