import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleNameMapper: {
        '@/test/(.*)': '<rootDir>/../test/$1',
        '@/(.*)': '<rootDir>/../src/$1',
    },
    coverageDirectory: '../coverage',
    coverageReporters: ['json-summary', 'lcov'],
    testEnvironment: 'node',
};

export default config;
