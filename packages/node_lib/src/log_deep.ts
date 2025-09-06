import { inspect, type InspectOptions } from 'node:util'

/**
 * Logs a variable to the console with deep inspection for debugging.
 * It returns the original variable to allow for easy chaining.
 *
 * @template T The type of the object being logged.
 * @param {T} object The variable to inspect and log.
 * @param {InspectOptions} [options] Optional configuration for `node:util.inspect`.
 * @returns {T} The original object that was passed in.
 * @example
 * const data = { user: { id: 1, name: 'Alex' } };
 * logDeep(data);
 *
 * // It can also be used inline without breaking code flow
 * const user = logDeep(await findUser({ id: 123 }));
 */
export const logDeep = <T>(object: T, options: InspectOptions = {}): T => {
  // Sensible defaults that can be overridden
  const defaultOptions: InspectOptions = {
    depth: 15,
    colors: true,
    showHidden: false,
  }

  console.log(inspect(object, { ...defaultOptions, ...options }))

  // Return the original object to enable chaining
  return object
}
