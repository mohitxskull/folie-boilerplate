import { z } from 'zod'

const PivotTimestampsSchema = z.union([
  z.boolean(),
  z.object({
    createdAt: z.union([z.string(), z.boolean()]),
    updatedAt: z.union([z.string(), z.boolean()]),
  }),
])

const PivotOptionsSchema = z.object({
  pivotTable: z.string(),
  pivotColumns: z.array(z.string()).optional(),
  localKey: z.string().optional(),
  pivotForeignKey: z.string().optional(),
  relatedKey: z.string().optional(),
  pivotRelatedForeignKey: z.string().optional(),
  pivotTimestamps: PivotTimestampsSchema.optional(),
  serializeAs: z.string().nullish(),
  meta: z.any().optional(),
})

const TableEntrySchema = z.object({
  name: z.string(),
  pivot: PivotOptionsSchema.optional(),
  columns: z.record(z.string(), z.string()),
})

const TableReferenceSchema = z.record(z.string(), TableEntrySchema)

export type PivotOptions = z.infer<typeof PivotOptionsSchema>

export type TableReference = z.infer<typeof TableReferenceSchema>

// --- The DBReference Class Implementation ---

type ColumnsAccessor<T extends TableReference[keyof TableReference]> = (<
  K extends keyof T['columns'],
>(
  columnKey: K
) => string) & { readonly [K in keyof T['columns']]: T['columns'][K] }

/**
 * Helper type for the aliased column keys (e.g., `userIdC`).
 * This maps each column key `someKey` to a new property `someKeyC`
 * whose value is the original key as a string literal ('someKey').
 */
type ColumnAliasProperties<T extends TableReference[keyof TableReference]> = {
  readonly [K in keyof T['columns'] as `${string & K}C`]: K
}

/**
 * The main accessor for a single table.
 * - `table`: Contains metadata and helper functions (`name`, `columns`, `pivot`).
 * - Direct properties: For direct access to column names (e.g., `dbRef.user.userId`).
 * - Aliased properties: For accessing the original key (e.g., `dbRef.user.userIdC`).
 */
type TableAccessor<T extends TableReference[keyof TableReference]> = {
  readonly table: {
    readonly name: T['name']
    readonly columns: ColumnsAccessor<T>
    readonly pivot: 'pivot' extends keyof T
      ? (customOptions?: Partial<PivotOptions>) => PivotOptions | undefined
      : never
  }
} & {
  readonly [K in keyof T['columns']]: T['columns'][K]
} & ColumnAliasProperties<T>

type DBReferenceObject<T extends TableReference> = {
  readonly [K in keyof T]: TableAccessor<T[K]>
}

/**
 * A factory class for creating a type-safe database reference object.
 */
export class DBReference {
  private constructor() {}

  /**
   * Creates a type-safe database reference object from a structure definition.
   *
   * @param structure The database structure object, declared with `as const`.
   */
  public static create<T extends TableReference>(structure: T): DBReferenceObject<T> {
    TableReferenceSchema.parse(structure)

    const dbReferenceObject = {} as { [K in keyof T]: TableAccessor<T[K]> }

    for (const key in structure) {
      if (Object.prototype.hasOwnProperty.call(structure, key)) {
        const tableName = key as keyof T
        const tableConfig = structure[tableName]
        const rawColumns = tableConfig.columns

        const columnsAccessor = (<K extends keyof typeof rawColumns>(columnKey: K) => {
          return `${tableConfig.name}.${rawColumns[columnKey]}`
        }) as ColumnsAccessor<typeof tableConfig>

        for (const colKey in rawColumns) {
          if (Object.prototype.hasOwnProperty.call(rawColumns, colKey)) {
            Object.defineProperty(columnsAccessor, colKey, {
              value: rawColumns[colKey as keyof typeof rawColumns],
              enumerable: true,
              writable: false, // Match the `readonly` type
              configurable: true,
            })
          }
        }

        // Create the aliased column properties (e.g., { userIdC: 'userId' })
        const columnAliases = Object.keys(rawColumns).reduce(
          (acc, colKey) => {
            ;(acc as any)[`${colKey}C`] = colKey
            return acc
          },
          {} as ColumnAliasProperties<typeof tableConfig>
        )

        // Construct the final accessor object with the new nested `table` property.
        const tableAccessor = {
          table: {
            name: tableConfig.name,
            columns: columnsAccessor,
            // Cast to `any` during creation; the external `TableAccessor` type
            // will correctly expose this only on tables that have a pivot key.
            pivot: ((customOptions?: Partial<PivotOptions>) => {
              if (!tableConfig.pivot && !customOptions) return undefined
              return {
                ...(tableConfig.pivot || {}),
                ...(customOptions || {}),
              } as PivotOptions
            }) as any,
          },
          ...rawColumns,
          ...columnAliases,
        }

        dbReferenceObject[tableName] = tableAccessor as unknown as TableAccessor<T[keyof T]>
      }
    }

    return dbReferenceObject as DBReferenceObject<T>
  }
}
