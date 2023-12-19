module.exports = {
  verbose: true,
  clearMocks: true,
  coverageThreshold: {
    './src/actions/': {
      branches: 94,
      functions: 95,
      lines: 95,
      statements: 95
    },
    './src/reducers/': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    },
    './src/selectors/': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  collectCoverageFrom: [
    './src/**/*.{js,jsx}',
    '!./src/**/index.{js,jsx}',
    '!./src/assets/**/*.*',
    '!./src/mocks/*.*',
    '!./src/mocks/**/*.*'
  ],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    './lib'
  ],
  moduleDirectories: [
    './src',
    'node_modules'
  ],
  moduleNameMapper: {
    '\\.(css|less|s[c|a]ss|png|jpg|jpeg|gif)$': 'identity-obj-proxy',
    '\\.svg': '<rootDir>/src/mocks/mockSvg.js',
    '@/(.*)$': '<rootDir>/src/$1'
  },
  errorOnDeprecated: true,
  setupFilesAfterEnv: [
    './dayjs.setup.js',
    './jest.setup.js',
    './jestDom.setup.js'
  ],
  setupFiles: [
    './jest.overrides.js',
    'jest-canvas-mock'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  transform: {
    '\\.(js|jsx)$': [
      'babel-jest',
      {
        configFile: './jest.babelrc.js'
      }
    ]
  }
}
