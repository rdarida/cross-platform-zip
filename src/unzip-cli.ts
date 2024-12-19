#!/usr/bin/env node
import yargs from 'yargs';

import { unzipSync } from '.';

(argv => {
  try {
    unzipSync(argv.path, argv.dest);
  } catch (e: any) {
    console.error(e);
  }
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
    .check(argv => {
      if (Array.isArray(argv.path)) {
        throw new Error('The "--path" parameter can only be specified once.');
      }

      if (Array.isArray(argv.dest)) {
        throw new Error('The "--dest" parameter can only be specified once.');
      }

      return true;
    })
    .parseSync()
);
