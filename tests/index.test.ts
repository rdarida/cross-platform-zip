import { greet } from '../src/index';

describe('Test exports', () => {
  test('greet should return with "Hello, cross-platform-zip!"', () => {
    expect(greet()).toBe('Hello, cross-platform-zip!');
  });
});
