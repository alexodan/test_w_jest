import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fetchJoke } from './4_mockFetch';

describe('4_mockFetch - simple', () => {
  const server = setupServer(
    rest.get('https://v2.jokeapi.dev/joke/Programming', (req, res, ctx) => {
      const topic = req.url.searchParams.get('contains');
      if (!topic) {
        return res(
          ctx.json({
            type: 'single',
            joke: "Knock knock. Who's there? Recursion. Recursion who? Knock knock.",
          })
        );
      }
      return res(
        ctx.json({
          type: 'single',
          joke: "bug. that's it that's the joke",
        })
      );
    })
  );
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it('returns a single-type joke from Programming category without specific keywords', async () => {
    expect(await fetchJoke()).toBe(
      "Knock knock. Who's there? Recursion. Recursion who? Knock knock."
    );
  });

  it('returns a single-type joke from Programming category containing the keyword "bug"', async () => {
    expect(await fetchJoke('bug')).toBe("bug. that's it that's the joke");
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
  });
});

describe('fetchJoke - error handling', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  const server = setupServer(
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

  it('gracefully handles error response structures from the API', async () => {
    expect(await fetchJoke()).toBe('Something went wrong. Ran out of good jokes');
  });
});
