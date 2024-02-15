import { fetchJoke } from './4_mockFetch';

// You'll practice how to mock Network requests (fetch)!
// - Simple: Mock fetch manually - https://www.youtube.com/watch?v=mHXhuPHiDj8
// - Real-world: Use `fetch-mock-jest` to mock fetch - https://www.youtube.com/watch?v=yhUep7E9O20
// - Bonus (Advanced): Use `msw` to intercept the requests. - https://www.youtube.com/watch?v=v77fjkKQTH0

describe('4_mockFetch - simple', () => {
  it('returns a single-type joke from Programming category without specific keywords', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            type: 'single',
            joke: "Knock knock. Who's there? Recursion. Recursion who? Knock knock.",
          }),
      })
    );
    await fetchJoke();
    expect(fetch).toHaveBeenCalledWith('https://v2.jokeapi.dev/joke/Programming');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('returns a single-type joke from Programming category containing the keyword "bug"', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            type: 'single',
            joke: "bug. that's it that's the joke",
          }),
      })
    );
    await fetchJoke('bug');
    expect(fetch).toHaveBeenCalledWith('https://v2.jokeapi.dev/joke/Programming?contains=bug');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('returns a two-part joke from Programming category with setup and delivery', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            type: 'twopart',
            joke: '...',
          }),
      })
    );
    await fetchJoke();
    expect(fetch).toHaveBeenCalledWith('https://v2.jokeapi.dev/joke/Programming');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('returns the response as is when type is not present in response object', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve('a joke'),
      })
    );
    await fetchJoke();
    expect(fetch).toHaveBeenCalledWith('https://v2.jokeapi.dev/joke/Programming');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe('fetchJoke - error handling', () => {
  it('throws when a network error occurs', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('error')));

    await expect(fetchJoke()).rejects.toThrow('error');

    expect(fetch).toHaveBeenCalledWith('https://v2.jokeapi.dev/joke/Programming');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('gracefully handles error response structures from the API', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            error: true,
            message: 'Something went wrong',
            causedBy: ['Ran out of good jokes'],
          }),
      })
    );
    await fetchJoke();
    expect(fetch).toHaveBeenCalledWith('https://v2.jokeapi.dev/joke/Programming');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
