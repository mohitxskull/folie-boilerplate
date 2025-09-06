import Permission from '#models/permission'
import { BaseTransformer } from '@localspace/node-lib/transformer'

export class PermissionTransformer extends BaseTransformer<Permission> {
  async default() {
    return {
      id: this.resource.id,
      resourceId: this.resource.resourceId,
      actions: this.resource.actions,
    }
  }
}
