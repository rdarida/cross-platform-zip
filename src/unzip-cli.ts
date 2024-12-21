#!/usr/bin/env node
import yargs from 'yargs';

import { unzipSync } from '.';

type Args = {
  source: string;
  destination: string;
};

yargs
  .scriptName('cp-unzip')
  .usage('$0 <source> <destination>')
  .example(
    '$0 source.zip destfolder',
    'Extracts files from a specified archive (zipped) file.'
  )
  .help()
  .command<Args>(
    '$0 <source> <destination>',
    'Extracts files from a specified archive (zipped) file.',
    yargs => {
      yargs
        .positional('source', {
          demandOption: true,
          describe: 'Specifies the path to the archive file',
          type: 'string'
        })
        .positional('destination', {
          demandOption: true,
          describe: 'Specifies the path to the output folder',
          type: 'string'
        });
    },
    args => {
      try {
        unzipSync(args.source, args.destination);
      } catch (e: any) {
        console.error(e);
      }
    }
  )
  .strict()
  .parseSync();
