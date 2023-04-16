module.exports = {
	preset: './src/test/app-preset.js',
	maxWorkers: '50%',
	setupFilesAfterEnv: [
		'<rootDir>/src/test/setup.ts'
	],
	moduleNameMapper: {
		'^@/(.*)': '<rootDir>/src/$1'
	}
};