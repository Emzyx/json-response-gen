const yargs = require("yargs");
const path = require("path");
const kleur = require("kleur");

const DEFAULT_TEMPLATE_DIR = "__jgen__/templates";

const run = (maybeArgs) => {
  const args = maybeArgs || process.argv.slice(2);
  const argv = yargs(args).argv;
  const location = argv?.dir || DEFAULT_TEMPLATE_DIR;
  try {
    const resolvedPath = path.resolve(`${location}`);
    console.log(
      kleur.yellow("Looking for template in: "),
      kleur.blue(resolvedPath),
    );
    const buildScript = require(resolvedPath);
    buildScript();
  } catch (e) {
    console.error(kleur.yellow("Error: "), kleur.red(e));
  }
};

module.exports = {
  run,
};
