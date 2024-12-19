export function zipSync(path: string | string[], dest: string): void {
  console.log('zipSync');
  console.log(path);
  console.log(dest);
}

export function unzipSync(path: string, dest: string): void {
  console.log('unzipSync');
  console.log(path);
  console.log(dest);
}
