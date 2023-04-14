
/**
 * @type {import('jest').Config}
 */
const config = {
    testEnvironment: 'jsdom',
    maxWorkers: '50%',
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
    preset: 'ts-jest',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        "^.+\\.vue$": "@vue/vue3-jest"
    }
}

module.exports = config;