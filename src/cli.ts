#!/usr/bin/env node
import yargs from 'yargs';

import { greet } from '.';

(argv => {
  console.log(greet());
  console.log(argv);
})(yargs.scriptName('cpzip').usage('$0 [args]').help().argv);
