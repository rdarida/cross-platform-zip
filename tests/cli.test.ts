import { join, resolve } from 'path';
import { sync as rimraf } from 'rimraf';
import { mkdirSync, readFileSync } from 'fs';
import { execSync } from 'child_process';

const TXT1 = 'test data 1.txt';
const TXT2 = 'test data 2.txt';
const ZIP = 'test data.zip';
const DATA = resolve(__dirname, 'data');
const TXT1_DATA = join(DATA, TXT1);
const TXT2_DATA = join(DATA, TXT2);
const ZIP_DATA = join(DATA, ZIP);
const DIST_FOLDER = resolve(__dirname, 'dist');
const UNZIPPED1 = join(DIST_FOLDER, TXT1);
const UNZIPPED2 = join(DIST_FOLDER, TXT2);
const ZIPPED = join(DIST_FOLDER, ZIP);

function zip(paths: string[], dest: string): void {
  const command = [
    'node dist/zip-cli.js',
    `"${dest}"`,
    ...paths.map(p => `"${p}"`)
  ].join(' ');

  execSync(command, { cwd: process.cwd() });
}

function unzip(src: string, dest: string): void {
  const command = ['node dist/unzip-cli.js', `"${src}"`, `"${dest}"`].join(' ');

  execSync(command, { cwd: process.cwd() });
}

describe('Test cli', () => {
  beforeEach(() => {
    rimraf(DIST_FOLDER);
    mkdirSync(DIST_FOLDER);
  });

  test('zip "[test data 1.txt]" with zipSync', () => {
    zip([TXT1_DATA], ZIPPED);
    unzip(ZIPPED, DIST_FOLDER);

    const expected = readFileSync(TXT1_DATA);
    const actual = readFileSync(UNZIPPED1);
    expect(actual).toEqual(expected);
  });

  test('zip "[test data 1.txt, test data 2.txt]" with zipSync', () => {
    zip([TXT1_DATA, TXT2_DATA], ZIPPED);
    unzip(ZIPPED, DIST_FOLDER);

    let expected = readFileSync(ZIP_DATA);
    let actual = readFileSync(ZIPPED);
    expect(actual).toEqual(expected);

    // expected = readFileSync(TXT2_DATA);
    // actual = readFileSync(UNZIPPED2);
    // expect(actual).toEqual(expected);
  });

  test('unzip "test data.zip" with unzipSync', () => {
    unzip(ZIP_DATA, DIST_FOLDER);

    let expected = readFileSync(TXT1_DATA);
    let actual = readFileSync(UNZIPPED1);
    expect(actual).toEqual(expected);

    expected = readFileSync(TXT2_DATA);
    actual = readFileSync(UNZIPPED2);
    expect(actual).toEqual(expected);
  });

  afterAll(() => {
    rimraf(DIST_FOLDER);
  });
});
