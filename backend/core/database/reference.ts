import { TableReference } from '@folie/package-backend-lib'

export const table = {
  user: {
    name: 'users',
    columns: {
      id: 'id',
      email: 'email',
      name: 'name',
      age: 'age',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
} as const satisfies TableReference
