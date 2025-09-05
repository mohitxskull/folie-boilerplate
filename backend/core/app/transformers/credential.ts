import Credential from '#models/credential'
import { BaseTransformer } from '@localspace/package-backend-lib/transformer'

export class CredentialTransformer extends BaseTransformer<Credential> {
  async default() {
    return {
      id: this.resource.id,
      method: this.resource.type,
      identifier: this.resource.identifier,
    }
  }
}
