import presets from 'ts-jest/presets/index.js';
import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json' assert { type: "json" };

export default {
    watchman: false,
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
    roots: ['<rootDir>'],
    modulePaths: [tsconfig.compilerOptions.baseUrl],
    moduleFileExtensions: ["js", "ts", "json", "vue"],
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
    transform: {
      "^.+\\.vue$": "@vue/vue3-jest",
      ...presets.defaults.transform
    }
}