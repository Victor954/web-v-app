module.exports = {
	preset: './src/tests/app-preset.js',
	maxWorkers: '50%',
	transform: {
		'^.+\\.ts?$': [
			'ts-jest',
			{
				isolatedModules: true,
			},
		],
	},
	setupFilesAfterEnv: [
		'<rootDir>/src/tests/setup.ts'
	],
	moduleNameMapper: {
		'^@/(.*)': '<rootDir>/src/$1'
	}
};