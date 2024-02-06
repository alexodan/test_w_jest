import { validatePasswordApi, randomizer } from './3_mockDep.utils';

const abc = 'abcdefghijklmnopqrstuvwyxz';

export async function generatePassword(size = 0, specialChar = '') {
  // If the size is not provided, an error is thrown
  if (size === 0) {
    throw new Error('Invalid parameters');
  }

  let password = '';

  // Randomly get a letter to append to our password string
  for (let i = 0; i < size; i++) {
    password += abc[randomizer(1, abc.length)];
  }

  // Append a special char on the end of the string, if provided
  if (specialChar) {
    password += specialChar;
  }

  // Use a service to validate our password
  await validatePasswordApi(password);

  // Return our super secure and random password!
  return password;
}
