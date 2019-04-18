const args = require('minimist')(process.argv.slice(2));

const url = args._[0];
const { help } = args;

if (!url || help) {
  console.log(
  `
  Usage: node diff.js 'http://url.com' -w 1600 -h 1000
  `
  );
  process.exit();
}

const viewPort = {
  width: args.w || 1600,
  height: args.h || 1200,
}

const Differencify = require('differencify');

const differencify = new Differencify({ mismatchThreshold: 0.0000001 });

(async () => {
  try {
    const result = await differencify
    .init()
    .launch()
    .newPage()
    .setViewport(viewPort)
    .goto(url)
    .waitFor(1000)
    // .click('[data-dialog-id=standards-takeover-dialog]')
    // .waitFor(3000)
    .screenshot()
    .toMatchSnapshot()
    .result(console.log)
    .close()
    .end();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
