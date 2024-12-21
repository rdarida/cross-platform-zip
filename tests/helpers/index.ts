import { execSync } from 'child_process';

export function zip(paths: string[], dest: string): void {
  const command = [
    'node dist/zip-cli.js',
    `"${dest}"`,
    ...paths.map(p => `"${p}"`)
  ].join(' ');

  execSync(command, { cwd: process.cwd() });
}

export function unzip(src: string, dest: string): void {
  const command = ['node dist/unzip-cli.js', `"${src}"`, `"${dest}"`].join(' ');

  execSync(command, { cwd: process.cwd() });
}
