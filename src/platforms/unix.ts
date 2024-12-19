import { execFileSync } from 'child_process';

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
  console.log('unix.zipSync');
  console.log(path);
  console.log(dest);
}

/**
 * Extracts files from a specified archive (zipped) file.
 * This is a wrapper function for unzip.
 *
 * @param path Specifies the path to the archive file.
 * @param dest Specifies the path to the output folder.
 */
export function unzipSync(path: string, dest: string): void {
  execFileSync('unzip', ['-o', path, '-d', dest], {
    maxBuffer: Infinity,
    windowsHide: true
  });
}
