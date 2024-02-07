// Your tests here...
// You'll practice the basics of jest mocks
import { guardPower } from './2_mockFn';

const mockFn = jest.fn(x => x);

describe('guardPower()', () => {
  it('should call the callback', () => {
    const output = guardPower(mockFn, 3);

    expect(mockFn).toHaveBeenCalledWith(27);
    expect(output).toBe(27);
  });

  it('should throw an error', () => {
    expect(() => {
      guardPower(mockFn, 8);
    }).toThrow('The power of 8 is bigger than 500...');
  });
});
