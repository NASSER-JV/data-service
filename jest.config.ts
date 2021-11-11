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
    collectCoverageFrom: [
        '**/*.(t|j)s',
        '!main.ts',
        '!routes.ts',
        '!**/migrations/**',
        '!**/*.module.(t|j)s',
        '!**/controllers/**',
        '!**/configurations/**',
        '!**/api/dtos/**',
        '!**/app/dtos/**',
        '!**/app/integration-events/**',
        '!**/domain/events/**',
        '!**/domain/exceptions/**',
        '!**/domain/seed-work/**',
        '!**/infrastructure/adapters/factories/.provider.ts',
        '!**/infrastructure/facades/core/**',
        '!**/ioc/**',
    ],
    coverageDirectory: '../coverage',
    coverageReporters: ['json-summary', 'lcov'],
    testEnvironment: 'node',
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
        },
    },
};

export default config;
