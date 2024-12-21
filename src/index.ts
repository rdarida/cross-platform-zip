import { unix, windows } from './platforms';

/**
 * Creates a compressed archive, or zipped file,
 * from specified files and folders.
 *
 * @param dest Specifies the path to the archive output file.
 *
 * @param path Specifies the path or paths to the files
 *             to add to the archive zipped file.
 */
export function zipSync(dest: string, ...path: string[]): void {
  switch (process.platform) {
    case 'win32': {
      windows.zipSync(dest, ...path);
      break;
    }

    case 'darwin':
    case 'linux': {
      unix.zipSync(dest, ...path);
      break;
    }

    default:
      break;
  }
}

/**
 * Extracts files from a specified archive (zipped) file.
 *
 * @param src Specifies the path to the archive file.
 *
 * @param dest Specifies the path to the output folder.
 */
export function unzipSync(src: string, dest: string): void {
  switch (process.platform) {
    case 'win32': {
      windows.unzipSync(src, dest);
      break;
    }

    case 'darwin':
    case 'linux': {
      unix.unzipSync(src, dest);
      break;
    }

    default:
      break;
  }
}
