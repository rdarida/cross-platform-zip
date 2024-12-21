#!/usr/bin/env node
import yargs from 'yargs';

import { zipSync } from '.';

type Args = {
  destination: string;
  path: string[];
};

yargs
  .scriptName('cp-zip')
  .usage('$0 <destination> <path...>')
  .example(
    '$0 dest.zip folder file1 file2.txt',
    'Creates a compressed archive, or zipped file, from specified files and folders.'
  )
  .help()
  .command<Args>(
    '$0 <destination> <path...>',
    'Creates a compressed archive, or zipped file, from specified files and folders.',
    yargs => {
      yargs
        .positional('destination', {
          demandOption: true,
          describe: 'Specifies the path to the archive output file',
          type: 'string'
        })
        .positional('path', {
          demandOption: true,
          describe:
            'Specifies the path(s) to the file(s) to add to the archive zipped file',
          type: 'string',
          array: true
        });
    },
    args => {
      try {
        zipSync(args.destination, ...args.path);
      } catch (e: any) {
        console.error(e);
      }
    }
  )
  .strict()
  .parseSync();
