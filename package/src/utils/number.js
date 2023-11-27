/**
 * Rounds the number to the specified precision.
 *
 * NOTE: Used with the objects coordinates comparison due to precision lost that might occur after floating point number computation.
 * @param {Number} num - number that should be rounded.
 * @param {Number} digits - number of digits after the semicolon.
 * @param {Number} base - number base.
 */
const toFixedNumber = (num, digits = 10, base = 10) => {
  const pow = Math.pow(base, digits)
  return Math.round(num * pow) / pow
}

export {
  toFixedNumber
}
