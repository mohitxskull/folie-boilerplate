import Role from '#models/role'
import { BaseTransformer } from '@localspace/node-lib/transformer'

export class RoleTransformer extends BaseTransformer<Role> {
  async default() {
    return {
      name: this.resource.name,
    }
  }

  async cache() {
    return {
      id: this.resource.id,
      ...(await this.default()),
    }
  }
}
