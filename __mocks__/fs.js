module.exports = {
  writeFile: jest.fn(),
  existsSync: jest.fn(() => {
    return false;
  }),
  mkdirSync: jest.fn(),
};
