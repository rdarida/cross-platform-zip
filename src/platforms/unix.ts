import { exec, which } from 'shelljs';
import { basename, dirname } from 'path';

import { MissingUtilityError } from './MissingUtilityError';

/**
 * Creates a compressed archive, or zipped file,
 * from specified files and folders.
 * This is a wrapper function for zip.
 *
 * @param paths Specifies the path or paths to the files
 *             to add to the archive zipped file.
 *
 * @param dest Specifies the path to the archive output file.
 */
export function zipSync(paths: string[], dest: string): void {
  if (!which('zip')) {
    throw new MissingUtilityError('zip');
  }

  for (const p of paths) {
    const options = {
      cwd: dirname(p),
      maxBuffer: Infinity,
      silent: true,
      windowsHide: true
    };

    exec(`zip -r -y "${dest}" "${basename(p)}"`, options);
  }
}

/**
 * Extracts files from a specified archive (zipped) file.
 * This is a wrapper function for unzip.
 *
 * @param src Specifies the path to the archive file.
 *
 * @param dest Specifies the path to the output folder.
 */
export function unzipSync(src: string, dest: string): void {
  if (!which('unzip')) {
    throw new MissingUtilityError('unzip');
  }

  const options = {
    maxBuffer: Infinity,
    silent: true,
    windowsHide: true
  };

  exec(`unzip -o "${src}" -d "${dest}"`, options);
}
