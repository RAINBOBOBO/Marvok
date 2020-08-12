"use strict";
/** Command-line tool to generate Markov text. */
const fsP = require("fs/promises");
const { MarkovMachine } = require("./markov");

async function makeText(path) {
  let content;
  try {
    content = await fsP.readFile(path, "utf8");
  } catch(err) {
    console.error(`Error reading ${path}: ${err} in makeText.`);
    process.exit(1);
  }

  return content;
}

async function demoChain() {
  let path = process.argv[3];
  let content = await makeText(path);

  let mark = new MarkovMachine(content);
  mark.makeChains()
  mark.getText()
}

demoChain()