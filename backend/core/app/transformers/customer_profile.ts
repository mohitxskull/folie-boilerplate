import CustomerProfile from '#models/customer_profile'
import { BaseTransformer } from '@localspace/package-backend-lib/transformer'

export class CustomerProfileTransformer extends BaseTransformer<CustomerProfile> {
  async default() {
    return {
      id: this.resource.id,
      email: this.resource.email,
    }
  }
}
