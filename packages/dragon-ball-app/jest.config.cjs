/** @type {import('jest').Config} */
process.env.NODE_OPTIONS = '--experimental-vm-modules'

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'], // Usa SWC para transformar TypeScript y JSX
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Maneja imports de estilos
    '\\.svg$': '<rootDir>/jest-svg-transformer.js', // Si importas SVGs en los tests
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
