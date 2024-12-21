import { exec, which } from 'shelljs';

import { MissingUtilityError } from './MissingUtilityError';

/**
 * Creates a compressed archive, or zipped file,
 * from specified files and folders.
 * This is a wrapper function for Compress-Archive.
 *
 * @param dest Specifies the path to the archive output file.
 *
 * @param path Specifies the path or paths to the files
 *             to add to the archive zipped file.
 */
export function zipSync(dest: string, ...path: string[]): void {
  check();

  const command = [
    'powershell.exe',
    'Compress-Archive',
    '-Force',
    '-DestinationPath',
    `'${dest}'`,
    '-Path',
    path.map(p => `'${p}'`).join(', ')
  ].join(' ');

  const options = {
    maxBuffer: Infinity,
    silent: true,
    windowsHide: true
  };

  exec(command, options);
}

/**
 * Extracts files from a specified archive (zipped) file.
 * This is a wrapper function for Expand-Archive.
 *
 * @param src Specifies the path to the archive file.
 *
 * @param dest Specifies the path to the output folder.
 */
export function unzipSync(src: string, dest: string): void {
  check();

  const command = [
    'powershell.exe',
    'Expand-Archive',
    '-Force',
    '-Path',
    `'${src}'`,
    '-DestinationPath',
    `'${dest}'`
  ].join(' ');

  const options = {
    maxBuffer: Infinity,
    silent: true,
    windowsHide: true
  };

  exec(command, options);
}

function check(): void {
  if (!which('powershell')) {
    throw new MissingUtilityError('poweshell');
  }

  const command = [
    'powershell.exe',
    '$PSVersionTable.PSVersion.ToString()'
  ].join(' ');

  const psVersion = parseInt(exec(command, { silent: true }).toString()) || 0;

  if (psVersion < 5) {
    throw new Error('The installed PowerShell version is below 5');
  }
}
