import 'whatwg-fetch';
import { urls, server, rest, listenRequest } from './testServer';
import { fetchJoke } from './4_mockFetch';

describe('4_mockFetch - simple', () => {
  it('returns a single-type joke from Programming category without specific keywords', async () => {
    const request = listenRequest('https://v2.jokeapi.dev/joke/Programming');
    expect(await fetchJoke()).toBe(
      "Knock knock. Who's there? Recursion. Recursion who? Knock knock."
    );
    expect(request.matches).toHaveLength(1);
    request.cleanup();
  });

  it('returns a single-type joke from Programming category containing the keyword "bug"', async () => {
    const keyword = 'bug';
    const request = listenRequest(`https://v2.jokeapi.dev/joke/Programming?contains=${keyword}`);
    expect(await fetchJoke(keyword)).toBe(`${keyword}. that's it that's the joke`);
    expect(request.matches).toHaveLength(1);
    request.cleanup();
  });

  it('returns a two-part joke from Programming category with setup and delivery', async () => {
    server.use(
      rest.get('https://v2.jokeapi.dev/joke/Programming', (req, res, ctx) => {
        return res(
          ctx.json({
            type: 'twopart',
            setup: 'foo',
            delivery: 'bar',
          })
        );
      })
    );
    const request = listenRequest('https://v2.jokeapi.dev/joke/Programming');
    expect(await fetchJoke()).toContain('...');
    expect(request.matches).toHaveLength(1);
    request.cleanup();
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
    const request = listenRequest('https://v2.jokeapi.dev/joke/Programming');
    expect(await fetchJoke()).toBe('Something went wrong. Ran out of good jokes');
    expect(request.matches).toHaveLength(1);
    request.cleanup();
  });
});
