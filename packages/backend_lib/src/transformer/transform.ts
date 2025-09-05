import { LucidRow } from '@adonisjs/lucid/types/model'
import { BaseTransformer } from './base.js'
import vine from '@vinejs/vine'
import { SimplePaginatorContract } from '@adonisjs/lucid/types/querybuilder'
import { promiseMap } from '@localspace/package-lib'

const PaginationMetaSchema = vine.object({
  total: vine.number(),
  perPage: vine.number(),
  currentPage: vine.number(),
  lastPage: vine.number(),
  firstPage: vine.number(),
  firstPageUrl: vine.string(),
  lastPageUrl: vine.string(),
  nextPageUrl: vine.string().optional(),
  previousPageUrl: vine.string().nullable(),
})

type TransformerConstructor<TResource extends LucidRow> = new (
  resource: TResource
) => BaseTransformer<TResource>

type AsyncMethodKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => Promise<any> ? K : never
}[keyof T]

type AwaitedMethodReturn<T, K extends keyof T> = T[K] extends (...args: any[]) => Promise<any>
  ? Awaited<ReturnType<T[K]>>
  : never

export const transform = async <
  R extends LucidRow,
  T extends TransformerConstructor<R>,
  M extends AsyncMethodKeys<InstanceType<T>> | 'default' = 'default',
>(
  resource: R,
  transformer: T,
  method?: M
): Promise<AwaitedMethodReturn<InstanceType<T>, M>> => {
  const finalMethod = method || 'default'

  const instance: any = new transformer(resource)
  const transformed = await instance[finalMethod]()

  return transformed
}

export const transformArray = async <
  R extends LucidRow,
  T extends TransformerConstructor<R>,
  M extends AsyncMethodKeys<InstanceType<T>> | 'default' = 'default',
>(
  resource: R[],
  transformer: T,
  method?: M
) => {
  return await promiseMap(resource, async (item) => await transform(item, transformer, method))
}

export const transformPage = async <
  R extends LucidRow,
  P extends SimplePaginatorContract<R>,
  T extends TransformerConstructor<R>,
  M extends AsyncMethodKeys<InstanceType<T>> | 'default' = 'default',
>(
  resource: P,
  transformer: T,
  method?: M
) => {
  const serialized = resource.toJSON()

  return {
    data: await transformArray(serialized.data, transformer, method),
    meta: await vine.validate({
      schema: PaginationMetaSchema,
      data: serialized.meta,
    }),
  }
}
