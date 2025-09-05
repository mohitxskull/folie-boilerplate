import User from '#models/user'
import { LucidRow } from '@adonisjs/lucid/types/model'
import { BaseTransformer } from '@localspace/package-backend-lib/transformer'

export class UserTransformer extends BaseTransformer<User> {
  async default() {
    return {
      id: this.resource.id,
      name: this.resource.name,
      createdAt: this.datetime(this.resource.createdAt),
      updatedAt: this.datetime(this.resource.updatedAt),
    }
  }

  async list() {
    return {
      id: this.resource.id,
      name: this.resource.name,
    }
  }
}

type TransformerConstructor<R extends LucidRow> = new (resource: R) => BaseTransformer<R>

type AsyncMethodKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => Promise<any> ? K : never
}[keyof T]

type AwaitedMethodReturn<T, K extends keyof T> = T[K] extends (...args: any[]) => Promise<any>
  ? Awaited<ReturnType<T[K]>>
  : never

const transform = async <
  R extends LucidRow,
  T extends TransformerConstructor<R>,
  // 1. M now includes 'default' as a possibility and sets it as the default type.
  M extends AsyncMethodKeys<InstanceType<T>> | 'default' = 'default',
>(
  resource: R,
  transformer: T,
  method?: M
): Promise<AwaitedMethodReturn<InstanceType<T>, M>> => {
  // 2. Use the provided method, or fall back to 'default'.
  const finalMethod = method || 'default'

  // The 'any' assertion is kept from your original code to simplify the dynamic method call.
  const instance: any = new transformer(resource)
  const transformed = await instance[finalMethod]()

  // 3. The return type is now handled by the function's signature, removing the need for a final cast.
  return transformed
}

const test = await transform(new User(), UserTransformer, 'list')
