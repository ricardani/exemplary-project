// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: [
        'src/**/*.js',
        'src/**/*.jsx',
        '!src/index.js'
    ],

    // The directory where Jest should output its coverage files
    coverageDirectory: './reports',

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: [
        '/node_modules/'
    ],

    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: [
        'json',
        'text',
        'lcov',
        'clover'
    ],

    // An object that configures minimum threshold enforcement for coverage results
    coverageThreshold: {
        global: {
            lines: 100,
            functions: 100,
            branches: 100,
            statements: 100
        }
    },

    // A set of global variables that need to be available in all test environments
    // globals: {},

    // The maximum amount of workers used to run your tests.
    // Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number.
    // maxWorkers: 2 will use a maximum of 2 workers.
    maxWorkers: '50%',

    // An array of file extensions your modules use
    moduleFileExtensions: [
        'js',
        'jsx',
        'json'
    ],

    // A map from regular expressions to module names that allow to stub out resources with a single module
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tools/jest/__mocks__/fileMock.js',
        '\\.(css|scss)$': '<rootDir>/tools/jest/__mocks__/styleMock.js'
    },

    // The root directory that Jest should scan for tests and modules within
    rootDir: '../../',

    // The paths to modules that run some code to configure or set up the testing environment before each test
    setupFiles: ['jest-prop-type-error'],

    // A list of paths to modules that run some code to configure or set up the testing framework before each test
    setupFilesAfterEnv: ['<rootDir>/tools/jest/setupTests.js'],

    // A list of paths to snapshot serializer modules Jest should use for snapshot testing
    snapshotSerializers: ['enzyme-to-json/serializer'],

    // A map from regular expressions to paths to transformers
    // A transformer is a module that provides a synchronous function for transforming source
    // files.
    transform: {
        '^.+js(x)?$': 'babel-jest'
    },

    // The glob patterns Jest uses to detect test files
    testMatch: ['<rootDir>/src/**/__tests__/**/*.test.js'],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: [
        '/node_modules/'
    ],

    // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
    timers: 'fake',

    // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
    watchPathIgnorePatterns: ['<rootDir>/node_modules/']
};
