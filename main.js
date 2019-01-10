#!/usr/bin/env node
const program = require("commander");
const { run } = require("./index.js");
console.log('running');
program.version("1.0").description("Contact management system");
program
  .command("generate")
  .alias("g")
  .description("Generate screenshots for images in current folder"p)
  .action(() => {
    run();
    console.log('running.....');
  });
program.parse(process.argv);

