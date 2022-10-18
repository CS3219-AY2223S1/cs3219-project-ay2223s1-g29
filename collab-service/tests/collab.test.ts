// mock logger with jest
jest.mock('../src/loggers/logger');

describe('Simple expression tests', () => {
  it('sample test', async () => {
    expect(1).toBe(1);
  });
});
