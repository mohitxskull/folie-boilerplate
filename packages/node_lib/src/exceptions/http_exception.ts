import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { ValidationError } from './types.js'

/**
 * Configuration options for HTTPException instances
 */
type HTTPExceptionOptionsT = ErrorOptions & {
  status?: number
  code?: string
  metadata?: Record<string, unknown> | ValidationError[]
  reason?: unknown
  source?: string
  help?: string
  stack?: string
}

export class HTTPException extends Exception {
  /** Identifies this as a HTTPException for type checking */
  readonly parent = 'HTTPException'

  /**
   * Additional data to help API users understand or resolve the error.
   * This information is exposed to API consumers and should contain
   * user-safe, actionable details about the error.
   */
  declare metadata?: Record<string, unknown> | ValidationError[]

  /**
   * Internal error details for debugging and logging purposes.
   * This should contain sensitive or technical information that
   * is not exposed to end users but helps with internal debugging.
   */
  declare reason?: unknown

  /**
   * Identifies the specific property, field, or component that caused the error.
   * Useful for pinpointing validation errors or specific failure points.
   */
  declare source?: string

  /**
   * Creates a new HTTPException instance
   *
   * @param rawMessage - Error message or options object
   * @param rawOptions - Additional options when rawMessage is a string
   */
  constructor(rawMessage?: string | HTTPExceptionOptionsT, rawOptions?: HTTPExceptionOptionsT) {
    const message = typeof rawMessage === 'string' ? rawMessage : undefined
    const options = typeof rawMessage === 'string' ? rawOptions : rawMessage

    super(message, {
      cause: options?.cause,
      code: options?.code,
      status: options?.status,
    })

    this.metadata = options?.metadata
    this.reason = options?.reason
    this.source = options?.source
    this.help = options?.help
    this.stack = options?.stack || this.stack
  }

  /**
   * Handles the exception by sending a structured JSON response to the client.
   * This method is automatically called by AdonisJS when the exception is thrown.
   *
   * @param error - The exception instance
   * @param ctx - HTTP context containing request and response objects
   */
  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).json({
      id: ctx.request.id(),
      status: error.status,
      code: error.code,
      message: error.message,
      help: error.help,
      metadata: this.metadata,
      source: this.source,
    })
  }

  /**
   * Reports the exception to the logging system with appropriate log levels.
   * - 4xx errors: Warning level (client errors)
   * - 5xx errors: Error level (server errors)
   * - Other: Info level
   *
   * @param error - The exception instance
   * @param ctx - HTTP context containing request and logger
   */
  async report(error: this, ctx: HttpContext) {
    if (error.status >= 400 && error.status <= 499) {
      ctx.logger.warn({ err: error, ip: ctx.request.ip() }, error.message)
    } else if (error.status >= 500) {
      ctx.logger.error({ err: error, ip: ctx.request.ip() }, error.message)
    } else {
      ctx.logger.info({ err: error, ip: ctx.request.ip() }, error.message)
    }
  }

  /**
   * Converts the exception to a JSON-serializable object.
   * Useful for logging, debugging, and API responses.
   *
   * @returns Object representation of the exception
   */
  toJSON() {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      help: this.help,
      metadata: this.metadata,
      source: this.source,
      cause: this.cause,
      stack: this.stack,
    }
  }
}
