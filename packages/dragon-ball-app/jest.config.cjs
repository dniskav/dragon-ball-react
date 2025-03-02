module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
    '\\.svg$': '<rootDir>/jest-svg-transformer.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  verbose: true,
}
