import AdminProfile from '#models/admin_profile'
import { BaseTransformer } from '@localspace/package-backend-lib/transformer'

export class AdminProfileTransformer extends BaseTransformer<AdminProfile> {
  async default() {
    return {
      id: this.resource.id,
      email: this.resource.email,
    }
  }
}
