import { execFileSync } from 'child_process';
import { exec, which } from 'shelljs';
import { basename, dirname } from 'path';

/**
 * Creates a compressed archive, or zipped file,
 * from specified files and folders.
 * This is a wrapper function for zip.
 *
 * @param path Specifies the path or paths to the files
 *             to add to the archive zipped file.
 *
 * @param dest Specifies the path to the archive output file.
 */
export function zipSync(path: string | string[], dest: string): void {
  if (!which('zip')) {
    throw new Error('The zip is not installed or not found in the system.');
  }

  if (!Array.isArray(path)) {
    path = [path];
  }

  for (const p of path) {
    // const args = ['-r', '-y', dest, basename(p)];

    const options = {
      cwd: dirname(p),
      maxBuffer: Infinity,
      silent: true,
      windowsHide: true
    };

    // execFileSync('zip', args, options);
    exec(`zip -r -y "${dest}" "${basename(p)}"`, options);
  }
}

/**
 * Extracts files from a specified archive (zipped) file.
 * This is a wrapper function for unzip.
 *
 * @param path Specifies the path to the archive file.
 * @param dest Specifies the path to the output folder.
 */
export function unzipSync(path: string, dest: string): void {
  if (!which('unzip')) {
    throw new Error('The unzip is not installed or not found in the system.');
  }

  const options = {
    maxBuffer: Infinity,
    silent: true,
    windowsHide: true
  };

  exec(`unzip -o "${path}" -d "${dest}"`, options);
}
