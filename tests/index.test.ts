import { zipSync, unzipSync } from '../src/index';

describe('Test exports', () => {
  test('zipSync should be exported', () => {
    expect(zipSync).toBeTruthy();
  });

  test('unzipSync should be exported', () => {
    expect(unzipSync).toBeTruthy();
  });
});
