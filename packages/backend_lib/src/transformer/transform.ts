import { LucidRow } from '@adonisjs/lucid/types/model'
import { BaseTransformer } from './base.js'
import vine from '@vinejs/vine'
import { SimplePaginatorContract } from '@adonisjs/lucid/types/querybuilder'
import { promiseMap } from '@folie/package-lib'

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

type TransformerConstructor<D extends LucidRow> = new (model: D) => BaseTransformer<D>

export const transform = async <
  D extends LucidRow,
  M extends keyof InstanceType<typeof BaseTransformer<D>>,
>(
  resource: D,
  transformer: TransformerConstructor<D>,
  method?: M
) => {
  const finalMethod = method || 'default'

  const transformerInstance = new transformer(resource)

  return await transformerInstance[finalMethod]()
}

export const transformArray = async <
  D extends LucidRow,
  M extends keyof InstanceType<typeof BaseTransformer<D>>,
>(
  resource: D[],
  transformer: TransformerConstructor<D>,
  method?: M
) => {
  return await promiseMap(resource, async (model) => await transform(model, transformer, method))
}

export const transformPage = async <
  D extends LucidRow,
  P extends SimplePaginatorContract<D>,
  M extends keyof InstanceType<typeof BaseTransformer<D>>,
>(
  resource: P,
  transformer: TransformerConstructor<D>,
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
