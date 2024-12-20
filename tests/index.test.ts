import { join, resolve } from 'path';
import { sync as rimraf } from 'rimraf';
import { mkdirSync, readFileSync } from 'fs';

import { zipSync, unzipSync } from '../src/index';

const TXT1 = 'test_data_1.txt';
const TXT2 = 'test_data_2.txt';
const ZIP = 'test_data.zip';
const DATA = resolve(__dirname, 'data');
const TXT1_DATA = join(DATA, TXT1);
const TXT2_DATA = join(DATA, TXT2);
const ZIP_DATA = join(DATA, ZIP);
const DIST_FOLDER = resolve(__dirname, 'dist');
const UNZIPPED1 = join(DIST_FOLDER, TXT1);
const UNZIPPED2 = join(DIST_FOLDER, TXT2);
const ZIPPED = join(DIST_FOLDER, ZIP);

describe('Test exports', () => {
  beforeEach(() => {
    rimraf(DIST_FOLDER);
    mkdirSync(DIST_FOLDER);
  });

  test('zipSync should be exported', () => {
    expect(zipSync).toBeTruthy();
  });

  test('zip "[test_data_1.txt, test_data_2.txt]" with zipSync', () => {
    zipSync([TXT1_DATA, TXT2_DATA], ZIPPED);
    unzipSync(ZIPPED, DIST_FOLDER);

    let expected = readFileSync(TXT1_DATA);
    let actual = readFileSync(UNZIPPED1);
    expect(actual).toEqual(expected);

    expected = readFileSync(TXT2_DATA);
    actual = readFileSync(UNZIPPED2);
    expect(actual).toEqual(expected);
  });

  test('unzipSync should be exported', () => {
    expect(unzipSync).toBeTruthy();
  });

  test('unzip "test_data.zip" with unzipSync', () => {
    unzipSync(ZIP_DATA, DIST_FOLDER);

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
