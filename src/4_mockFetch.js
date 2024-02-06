// Check API

/**
 * Fetch a joke
 * Check docs: https://v2.jokeapi.dev/
 * @param {String} queryParams
 * Check examples in the index.js
 */
export async function fetchJoke(containsWord) {
  const endpoint = containsWord
    ? `https://v2.jokeapi.dev/joke/Programming?contains=${containsWord}`
    : 'https://v2.jokeapi.dev/joke/Programming';

  const response = await fetch(endpoint).then((r) => r.json());

  if (response.error) {
    const errorMessage = `${response.message}. ${response.causedBy.join('.')}`;
    return errorMessage;
  }

  if (response.type === 'single') {
    return response.joke;
  }

  if (response.type === 'twopart') {
    return `${response.setup} ... ${response.delivery}`;
  }

  return response;
}
