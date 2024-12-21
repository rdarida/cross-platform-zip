import { exec, which } from 'shelljs';

/**
 * Creates a compressed archive, or zipped file,
 * from specified files and folders.
 * This is a wrapper function for Compress-Archive.
 *
 * @param path Specifies the path or paths to the files
 *             to add to the archive zipped file.
 *
 * @param dest Specifies the path to the archive output file.
 */
export function zipSync(path: string | string[], dest: string): void {
  check();

  if (!Array.isArray(path)) {
    path = [path];
  }

  const command = [
    'powershell.exe',
    'Compress-Archive',
    '-Path',
    path.map(p => `'${p}'`).join(', '),
    '-DestinationPath',
    `'${dest}'`,
    '-Force'
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
 * @param path Specifies the path to the archive file.
 * @param dest Specifies the path to the output folder.
 */
export function unzipSync(path: string, dest: string): void {
  check();

  const command = [
    'powershell.exe',
    'Expand-Archive',
    '-Path',
    `'${path}'`,
    '-DestinationPath',
    `'${dest}'`,
    '-Force'
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
    throw new Error('PowerShell is not installed or not found in the system.');
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
