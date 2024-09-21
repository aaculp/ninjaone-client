module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // For JSX and ES Modules
    '^.+\\.tsx?$': 'babel-jest', // For TypeScript (if using)
  },
  moduleNameMapper: {
    "^next/image$": "<rootDir>/__test__/fileNextImageMock.js",
    '\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/__test__/fileMock.js', // Correct regex for asset files
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS/SCSS imports
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|my-project|react-native-button)/)', // Adjust this as needed
  ],
};
