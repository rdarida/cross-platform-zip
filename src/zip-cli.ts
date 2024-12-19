#!/usr/bin/env node
import yargs from 'yargs';

import { zipSync } from '.';

(argv => {
  zipSync(argv.path, argv.dest);
  console.log(argv);
})(
  yargs
    .scriptName('cp-zip')
    .usage(
      [
        '$0 [options]',
        'Creates a compressed archive, or zipped file, from specified files and folders.'
      ].join('\n\n')
    )
    .help()
    .options({
      path: {
        alias: 'p',
        demandOption: true,
        describe:
          'Specifies the path(s) to the file(s) to add to the archive zipped file',
        type: 'string'
      },
      dest: {
        alias: 'd',
        demandOption: true,
        describe: 'Specifies the path to the archive output file',
        type: 'string'
      }
    })
    .parseSync()
);
