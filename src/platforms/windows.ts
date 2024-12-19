import { execFileSync } from 'child_process';

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
  if (!Array.isArray(path)) {
    path = [path];
  }

  execFileSync(
    'powershell.exe',
    [
      'Compress-Archive',
      '-Path',
      path.map(p => `"${p}"`).join(', '),
      '-DestinationPath',
      `"${dest}"`,
      '-Force'
    ],
    {
      maxBuffer: Infinity,
      windowsHide: true
    }
  );
}

/**
 * Extracts files from a specified archive (zipped) file.
 * This is a wrapper function for Expand-Archive.
 *
 * @param path Specifies the path to the archive file.
 * @param dest Specifies the path to the output folder.
 */
export function unzipSync(path: string, dest: string): void {
  execFileSync(
    'powershell.exe',
    [
      'Expand-Archive',
      '-Path',
      `"${path}"`,
      '-DestinationPath',
      `"${dest}"`,
      '-Force'
    ],
    {
      maxBuffer: Infinity,
      windowsHide: true
    }
  );
}
