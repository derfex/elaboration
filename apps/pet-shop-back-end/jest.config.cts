module.exports = {
  coverageDirectory: '../../coverage/apps/pet-shop-back-end',
  displayName: 'pet-shop-back-end',
  moduleFileExtensions: ['ts', 'js', 'html'],
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
}
