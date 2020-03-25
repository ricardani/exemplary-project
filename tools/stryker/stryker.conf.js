const strykerOptions = {
    mutate: [
        'src/**/*.js?(x)',
        '!src/**/*@(.test|.spec|Spec|Config|Types).js?(x)',
        '!src/**/index.js'
    ],
    testRunner: 'jest',
    mutator: {
        name: 'javascript',
        plugins: [
            'asyncGenerators',
            'classProperties',
            'jsx',
            'objectRestSpread',
            'optionalChaining',
            ['decorators', { decoratorsBeforeExport: true }]
        ],
        sourceType: 'unambiguous'
    },
    transpilers: [],
    reporters: ['html', 'progress', 'clear-text'],
    coverageAnalysis: 'off',
    jest: {
        projectType: 'react',
        // eslint-disable-next-line global-require
        config: require('../jest/jest.config'),
        enableFindRelatedTests: true
    },
    thresholds: { high: 80, low: 60, break: 100 },
    timeoutMS: 60000,
    maxConcurrentTestRunners: 5
};

module.exports = config => {
    config.set(strykerOptions);
};
module.exports.strykerOptions = strykerOptions;
