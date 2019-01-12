#!/usr/bin/env node
const program = require("commander");
const { run } = require("./index.js");
program.version("1.0").description("MjGenerator is the tool generating screenshots for CH Play, App store quickly!!!");
program
  .command("generate")
  .alias("g")
  .description("Generate screenshots for images in current folder")
  .action(async () => {
    await run();
  });
program.parse(process.argv);
