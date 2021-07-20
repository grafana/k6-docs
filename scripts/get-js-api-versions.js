const versioning = require('../src/utils/versioning');

const terminalBreak = '='.repeat(20);
const newLine = `\n`;

const terminalColors = {
  magenta: `\x1b[35m`,
  green: `\x1b[32m`,
  RESET: `\x1b[0m`,
};

const toPrint = [
  [terminalColors.magenta, 'k6 JavaScript API versioning'],
  [newLine.repeat(1)],
  [terminalColors.RESET, terminalBreak],
  [newLine.repeat(1)],
  [terminalColors.green, `Current version: ${versioning.LATEST_VERSION}`],
  [newLine.repeat(1)],
  [terminalColors.RESET, terminalBreak],
  [newLine.repeat(1)],
  [terminalColors.green, `Archived versions:`],
  [terminalColors.RESET],
];

toPrint.map((lineParams) => console.log(...lineParams));
console.table(versioning.SUPPORTED_VERSIONS.reverse());
