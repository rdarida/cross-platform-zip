import { unix, windows } from './platforms';

/**
 * Creates a compressed archive, or zipped file,
 * from specified files and folders.
 *
 * @param path Specifies the path or paths to the files
 *             to add to the archive zipped file.
 *
 * @param dest Specifies the path to the archive output file.
 */
export function zipSync(path: string | string[], dest: string): void {
  switch (process.platform) {
    case 'win32': {
      windows.zipSync(path, dest);
      break;
    }

    case 'darwin':
    case 'linux': {
      unix.zipSync(path, dest);
      break;
    }

    default:
      break;
  }
}

/**
 * Extracts files from a specified archive (zipped) file.
 *
 * @param path Specifies the path to the archive file.
 * @param dest Specifies the path to the output folder.
 */
export function unzipSync(path: string, dest: string): void {
  switch (process.platform) {
    case 'win32': {
      windows.unzipSync(path, dest);
      break;
    }

    case 'darwin':
    case 'linux': {
      unix.unzipSync(path, dest);
      break;
    }

    default:
      break;
  }
}
