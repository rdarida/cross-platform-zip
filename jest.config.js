const { defaults } = require('jest-config');

module.exports = async () => {
  return {
    rootDir: __dirname,
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    collectCoverage: false, // npm test -- --collectCoverage
    collectCoverageFrom: ['./src/**/*.ts'],
    coveragePathIgnorePatterns: [
      ...defaults.coveragePathIgnorePatterns,
      '/dist/',
      '/src/cli.ts',
      '/tests/'
    ]
  };
};
