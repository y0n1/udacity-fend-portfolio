/* eslint-env node, es6 */

const fs = require('fs');
const liveServer = require('live-server');

let [, , ...args] = process.argv;
let selectedProject = args[0].replace(/[\.\\/]+/, '');
let projects = new Set();
let excluded = new Set([
  '.git',
  'node_modules',
]);

// Parses the current directory and adds all projects to the set
fs.readdirSync('./')
  .filter((entry) => {
    return !excluded.has(entry) && (fs.statSync(`./${entry}`).isDirectory())
  })
  .forEach((dir) => {
    projects.add(dir);
  });

if (args.length == 0) {
  throw new Error('No project was specified!');
}

if (projects.has(selectedProject)) {
  liveServer.start({ root: `${selectedProject}/src` });
} else {
  throw new Error(`Missing project called ${args[0]}`)
}
