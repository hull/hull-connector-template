# Hull Connector Template

This is a scaffolding tool for creating and maintaining [Hull](http://hull.io/) connectors. It comes with base directory and file structure, default configuration, documentation files templates.

The complete boiler plate template is in [template](./template) directory.
During generation it's being run through [lodash template](https://lodash.com/docs#template) function to replace `<%= var %>` with values from configuration and copied to a selected working path.

## Installation

Install it as a global node package:

`npm i -g hull-connector-template`

## Creating new connector

`hull-connector-template [working-path]`

You can execute this command over new directory which will be created, or run it inside an empty, already existing directory.

When run it will as you couple of questions interactively to fill in templates with data.

## Updating existing connnector

**Simple update**

Running `hull-connector-template` over an existing connector directory will pick configuration values from `package.json` and `manifest.json` files, so you won't have to answer configuration questions again, unless you want to change some configuration values.

It will also detect changes and conflicts over all files and will allow you to decide if overwrite file or keep old one.
This method works for files which are not modified on connector level, such as `.eslintrc`, `.babelrc` etc.

**Advanded update**

For files which are usually updated on the connector level - such as `package.json`, `manifest.json` or JS source code files etc. - simple method of overwriting/not overwriting whole file would not work.
In this case using dedicated GUI diffing tool is the best option to decide line-by-line what to update.

To get the filesystem path to the `hull-connector-template` directory which should be used for this diff execute following command:

`hull-connector-template --path`

This will return something like this:

`Path to perform diff:  /usr/local/lib/node_modules/hull-connector-template/template`

Then use it to run your diffing tool and compare template with actual connector code to peform move complex update:

`difftool  /usr/local/lib/node_modules/hull-connector-template/template ./connector-name`
