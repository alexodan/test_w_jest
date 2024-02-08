import { validatePasswordApi, randomizer } from './3_mockDep.utils';
import { generatePassword } from './3_mockDep';
// Your tests here...
// You'll practice how to mock dependencies
// in this case, validatePasswordApi() and randomizer()

jest.mock('./3_mockDep.utils', () => ({
  validatePasswordApi: jest.fn(),
  randomizer: jest.fn(),
}));

describe('3_mockDep', () => {
  beforeEach(() => {
    validatePasswordApi.mockResolvedValue(true);
    randomizer.mockImplementation((min, max) => min);
  });

  it('should generate a valid 10 char long pw with a letter and without special char', async () => {
    const output = await generatePassword(10);

    expect(output.length).toBe(10);
  });

  it('should generate a valid 10 char long pw with a letter and special char at the end', async () => {
    const output = await generatePassword(10, '!');

    expect(output.length).toBe(11);
  });

  it('should throw an error when size is not supplied', async () => {
    // https://jestjs.io/docs/tutorial-async
    expect(generatePassword()).rejects.toThrow('Invalid parameters');
  });
});
