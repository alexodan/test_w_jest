/**
 * Calls cb conditionally based on given number
 * @param {function} cb - Callback
 * @param {number} number
 */
export const guardPower = (cb, number) => {
  const power = number ** number; // eg 3 ** 3 = 3*3*3 = 27

  if (power <= 500) {
    return cb(power);
  }

  throw Error(`The power of ${number} is bigger than 500...`);
};
