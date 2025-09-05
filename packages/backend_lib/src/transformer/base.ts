import { LucidRow } from '@adonisjs/lucid/types/model'
import { DateTime } from 'luxon'

export abstract class BaseTransformer<TResource extends LucidRow> {
  constructor(protected readonly resource: TResource) {}

  /**
   * The primary method to transform the resource into a plain
   * JSON-serializable object.
   *
   * This method can be synchronous or asynchronous.
   */
  abstract default(): Promise<Record<string, any>>

  /**
   * Creates a new object containing only the specified keys from the source object.
   *
   * @param source The source object (usually `this.resource`).
   * @param keys An array of keys to pick.
   */
  protected pick<T extends object, K extends keyof T>(source: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>
    for (const key of keys) {
      if (key in source) {
        result[key] = source[key]
      }
    }
    return result
  }

  /**
   * Creates a new object omitting the specified keys from the source object.
   *
   * @param source The source object (usually `this.resource`).
   * @param keys An array of keys to omit.
   */
  protected omit<T extends object, K extends keyof T>(source: T, keys: K[]): Omit<T, K> {
    const result = { ...source }
    for (const key of keys) {
      delete (result as any)[key]
    }
    return result
  }

  protected datetime(dt: DateTime<true>): string
  protected datetime(dt: DateTime<true> | null): string | null
  protected datetime(dt: any): any {
    if (dt instanceof DateTime) {
      if (!dt.isValid) {
        throw new Error('Invalid DateTime')
      }

      return dt.toISO()
    } else {
      return null
    }
  }
}
