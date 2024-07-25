// jest.config.cjs
module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.js$': 'babel-jest',
        '^.+\\.ts$': 'ts-jest'
    },
    transformIgnorePatterns: [
        '/node_modules/'
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};