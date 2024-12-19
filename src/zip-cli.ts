#!/usr/bin/env node
import yargs from 'yargs';

import { zipSync } from '.';

(argv => {
  try {
    zipSync(argv.path, argv.dest);
  } catch (e: any) {
    console.error(e);
  }
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
    .check(argv => {
      if (Array.isArray(argv.dest)) {
        throw new Error('The "--dest" parameter can only be specified once.');
      }

      return true;
    })
    .parseSync()
);
