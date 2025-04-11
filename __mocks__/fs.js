module.exports = {
  writeFile: jest.fn((path) => console.log(`Writing: ${path}`)),
  existsSync: jest.fn(() => {
    return false;
  }),
  mkdirSync: jest.fn(),
};
