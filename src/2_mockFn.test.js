// Your tests here...
// You'll practice the basics of jest mocks
import { guardPower } from './2_mockFn';

const mockFn = jest.fn(x => x);

describe('guardPower()', () => {
  it('calls the callback with the power of the number if it is 500 or less', () => {
    const result = guardPower(mockFn, 3);

    expect(mockFn).toHaveBeenCalledWith(27);
    expect(result).toBe(27);
  });

  it('throws an error when the power of the number is greater than 500', () => {
    expect(() => {
      guardPower(mockFn, 8);
    }).toThrow('The power of 8 is bigger than 500...');
  });
});
