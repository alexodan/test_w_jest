import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

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
  }),
  rest.get('*', (req, res, ctx) => {
    console.error(`Please add a request handler for ${req.url.toString()}`);
    return res(ctx.json({ error: 'Please add a request handler' }));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
