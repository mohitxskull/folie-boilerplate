// import CustomerProfile from '#models/customer_profile'
import User from '#models/user'
import { BaseTransformer } from '@localspace/node-lib/transformer'

export class UserTransformer extends BaseTransformer<User> {
  async default() {
    return {
      id: this.resource.id,
      name: this.resource.name,
      createdAt: this.datetime(this.resource.createdAt),
      updatedAt: this.datetime(this.resource.updatedAt),
    }
  }

  async customerProfile() {
    await this.resource.load('customerProfile')

    return {
      ...(await this.default()),
    }
  }

  async customer() {
    return {
      id: this.resource.id,
      name: this.resource.name,
    }
  }
}
