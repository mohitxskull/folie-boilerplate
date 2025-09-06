import { LucidRow } from '@adonisjs/lucid/types/model'
import type { BaseTransformer } from './base.js'
import vine from '@vinejs/vine'
import { SimplePaginatorContract } from '@adonisjs/lucid/types/querybuilder'
import { promiseMap } from '@localspace/lib'

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
  R extends LucidRow & {
    transformer: TransformerConstructor<R>
  },
  M extends AsyncMethodKeys<InstanceType<R['transformer']>> | 'default' = 'default',
>(
  resource: R,
  method?: M
): Promise<AwaitedMethodReturn<InstanceType<R['transformer']>, M>> => {
  const finalMethod = method || 'default'

  const instance: any = new resource.transformer(resource)
  const transformed = await instance[finalMethod]()

  return transformed
}

export const transformArray = async <
  R extends LucidRow & {
    transformer: TransformerConstructor<R>
  },
  M extends AsyncMethodKeys<InstanceType<R['transformer']>> | 'default' = 'default',
>(
  resource: R[],
  method?: M
) => {
  return await promiseMap(resource, async (item) => await transform(item, method))
}

export const transformPage = async <
  R extends LucidRow & {
    transformer: TransformerConstructor<R>
  },
  P extends SimplePaginatorContract<R>,
  M extends AsyncMethodKeys<InstanceType<R['transformer']>> | 'default' = 'default',
>(
  resource: P,
  method?: M
) => {
  const serialized = resource.toJSON()

  return {
    data: await transformArray(serialized.data, method),
    meta: await vine.validate({
      schema: PaginationMetaSchema,
      data: serialized.meta,
    }),
  }
}
