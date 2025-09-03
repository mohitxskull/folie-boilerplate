import { errors } from '@vinejs/vine'
import { Exception } from '@adonisjs/core/exceptions'
import { HTTPException } from './http_exception.js'
import { ValidationError } from './types.js'
import { InternalServerErrorException, UnprocessableEntityException } from './list.js'

/**
 * Converts various error types into standardized CastleException instances.
 *
 * This function provides a centralized way to handle different error types
 * and convert them into consistent CastleException format for uniform
 * error handling across the application.
 *
 * @param error - The error to be parsed and converted
 * @returns A CastleException instance appropriate for the input error type
 *
 * @example
 * ```typescript
 * try {
 *   // Some operation that might throw
 * } catch (error) {
 *   const castleError = parseError(error)
 *   throw castleError
 * }
 * ```
 *
 * Handles the following error types:
 * - CastleException: Returns as-is
 * - VineJS validation errors: Converts to UnprocessableEntityException with validation metadata
 * - AdonisJS Exception: Converts to CastleException preserving status and code
 * - SyntaxError: Converts to InternalServerErrorException
 * - Unknown errors: Converts to generic InternalServerErrorException
 */
export const parseError = (error: unknown) => {
  if (error instanceof HTTPException) {
    return error
  } else if (error instanceof errors.E_VALIDATION_ERROR) {
    const messages: ValidationError[] = error.messages

    return new UnprocessableEntityException({
      metadata: messages,
    })
  } else if (error instanceof Exception) {
    // Don't add stack, adonisjs will automatically print the stack
    // of error which is causing it
    return new HTTPException(error.message, {
      status: error.status,
      code: error.code,
      help: error.help,
      cause: error,
    })
  } else if (error instanceof SyntaxError) {
    return new InternalServerErrorException(error.message, {
      cause: error,
    })
  } else {
    return new InternalServerErrorException({
      cause: error,
    })
  }
}
