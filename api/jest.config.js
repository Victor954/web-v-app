module.exports = {
    preset: "./test/app-preset.js",
    maxWorkers: '50%',
    setupFilesAfterEnv: [
        '<rootDir>/test/setup.ts'
    ],
    moduleNameMapper: {
        "^@/(.*)": "<rootDir>/$1"
    }
}