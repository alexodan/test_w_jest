import 'whatwg-fetch';
import { urls, server, rest } from './testServer';
import { fetchJoke } from './4_mockFetch';

describe('4_mockFetch - simple', () => {
  it('returns a single-type joke from Programming category without specific keywords', async () => {
    expect(await fetchJoke()).toBe(
      "Knock knock. Who's there? Recursion. Recursion who? Knock knock."
    );
    expect(urls[0]).toBe('https://v2.jokeapi.dev/joke/Programming');
  });

  it('returns a single-type joke from Programming category containing the keyword "bug"', async () => {
    const keyword = 'bug';
    expect(await fetchJoke(keyword)).toBe(`${keyword}. that's it that's the joke`);
    expect(urls[1]).toBe(`https://v2.jokeapi.dev/joke/Programming?contains=${keyword}`);
  });

  it('returns a two-part joke from Programming category with setup and delivery', async () => {
    server.use(
      rest.get('https://v2.jokeapi.dev/joke/Programming', (req, res, ctx) => {
        return res(
          ctx.json({
            type: 'twopart',
            setup: '...',
            delivery: '...',
          })
        );
      })
    );
    expect(await fetchJoke()).toContain('...');
    expect(urls[2]).toBe('https://v2.jokeapi.dev/joke/Programming');
  });

  it('gracefully handles error response structures from the API', async () => {
    server.use(
      rest.get('https://v2.jokeapi.dev/joke/Programming', (req, res, ctx) => {
        return res(
          ctx.json({
            error: true,
            message: 'Something went wrong',
            causedBy: ['Ran out of good jokes'],
          })
        );
      })
    );
    expect(await fetchJoke()).toBe('Something went wrong. Ran out of good jokes');
    expect(urls[3]).toBe('https://v2.jokeapi.dev/joke/Programming');
  });
});
