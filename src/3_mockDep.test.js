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
    jest.clearAllMocks();
    validatePasswordApi.mockResolvedValue(true);
    randomizer.mockImplementation(() => 1);
  });

  it('returns a valid 10 char long password with a letter and without special char', async () => {
    const result = await generatePassword(10);

    expect(validatePasswordApi).toHaveBeenCalledWith('bbbbbbbbbb');
    expect(result.length).toBe(10);
  });

  it('returns a valid 10 char long pw with a letter and special char at the end', async () => {
    const result = await generatePassword(10, '!');

    expect(validatePasswordApi).toHaveBeenCalledWith('bbbbbbbbbb!');
    expect(result.length).toBe(11);
  });

  it('throws an error when password is not strong enough', async () => {
    validatePasswordApi.mockRejectedValue(new Error('Password is not strong enough'));

    await expect(generatePassword(10)).rejects.toThrow('Password is not strong enough');
  });

  it('throws an error when size is not supplied', async () => {
    // https://jestjs.io/docs/tutorial-async
    expect(generatePassword()).rejects.toThrow('Invalid parameters');
  });
});
