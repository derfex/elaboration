module.exports = {
  coverageDirectory: '../coverage/derfex-profile-data-server',
  displayName: 'derfex-profile-data-server',
  moduleFileExtensions: ['ts', 'js', 'html'],
  preset: '../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
}
