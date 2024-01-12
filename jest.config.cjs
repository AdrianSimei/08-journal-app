module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [], // Esto se agrega para evitar los erroes de depndecias de firebase en la prueba de thunks.auth
}