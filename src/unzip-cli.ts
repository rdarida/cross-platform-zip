#!/usr/bin/env node
import yargs from 'yargs';

import { unzipSync } from '.';

(argv => {
  unzipSync(argv.path, argv.dest);
  console.log(argv);
})(
  yargs
    .scriptName('cp-unzip')
    .usage(
      [
        '$0 [options]',
        'Extracts files from a specified archive (zipped) file.'
      ].join('\n\n')
    )
    .help()
    .options({
      path: {
        alias: 'p',
        demandOption: true,
        describe: 'Specifies the path to the archive file',
        type: 'string'
      },
      dest: {
        alias: 'd',
        demandOption: true,
        describe: 'Specifies the path to the output folder',
        type: 'string'
      }
    })
    .parseSync()
);
