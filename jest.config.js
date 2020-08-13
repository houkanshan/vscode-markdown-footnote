const path = require('path');

const rootDir = path.resolve(__dirname);

module.exports = {
  rootDir,
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
};
