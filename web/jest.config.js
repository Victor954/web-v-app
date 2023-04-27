import presets from 'ts-jest/presets/index.js';

export default {
    watchman: false,
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
    moduleFileExtensions: ["js", "ts", "json", "vue"],
    transform: {
      "^.+\\.vue$": "@vue/vue3-jest",
      ...presets.defaults.transform
    }
}