/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Manejo de estilos
    '\\.svg$': '<rootDir>/jest-svg-transformer.js', // Transformador para SVGs
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // 🟢 Aquí cargamos Jest-DOM correctamente
}
