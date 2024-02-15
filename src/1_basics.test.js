import { multiply, isSmallerThan10 } from './1_basics';

// First, read about Testing principles:
// Pyramic test: https://semaphoreci.com/blog/testing-pyramid This one is fundamental to understand the mindset and the "downsides" of its methodology in the modern days.
// TDD vs BDD: https://www.softwaretestinghelp.com/tdd-vs-bdd/

// Then practice testing by using Jest.
// This free course will help you to complete the tests
// in this project:
// https://www.youtube.com/watch?v=__QEPUdnJS0

describe('1_Basics', () => {
  describe('multiply()', () => {
    it('returns two numbers multiplied', () => {
      const result = multiply(3, 5);
      expect(result).toBe(15);
    });
  });

  describe('isSmallerThan10()', () => {
    it('returns "yes dah!" given a number smaller than 10', () => {
      const result = isSmallerThan10(5);
      expect(result).toBe('yes dah!');
    });

    it('returns "not really..." given a number greater than 10', () => {
      const result = isSmallerThan10(10);
      expect(result).toBe('not really...');
    });
  });
});
