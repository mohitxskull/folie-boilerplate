import Membership from '#models/membership'
import { BaseTransformer } from '@localspace/package-backend-lib/transformer'

export class MembershipTransformer extends BaseTransformer<Membership> {
  async default() {
    return {
      id: this.resource.id,
      userId: this.resource.userId,
      roleId: this.resource.roleId,
    }
  }
}
