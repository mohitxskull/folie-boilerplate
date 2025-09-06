import User from '#models/user'
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
}
