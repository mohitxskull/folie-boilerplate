import { args, BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { HostManager } from '../host_manager.js'

export default class HostCheck extends BaseCommand {
  static commandName = 'host:check'
  static description =
    'Verifies a local domain is mapped in the hosts file and provides setup instructions if missing.'

  static options: CommandOptions = {
    startApp: false,
  }

  @args.string({
    description: 'The hostname to verify (e.g., api.localspace)',
    default: 'localhost',
  })
  declare host: string

  @args.string({
    description: 'The corresponding IP address',
    default: '127.0.0.1',
  })
  declare ip: string

  public async run() {
    const hostManager = new HostManager({
      hostname: this.host,
      ip: this.ip,
    })

    const hasEntry = hostManager.isEntryPresent()

    const statusText = hasEntry ? this.colors.green('Present') : this.colors.red('Missing')

    const sticker = this.ui
      .sticker()
      .heading('Host File Status')
      .add(`${this.colors.dim('Platform:')} ${hostManager.platform}`)
      .add(`${this.colors.dim('Hostname:')} ${this.host}`)
      .add(`${this.colors.dim('IP:')} ${this.ip}`)
      .add(`${this.colors.dim('Status:')} ${statusText}`)

    if (hasEntry) {
      sticker.render()
    } else {
      const setup = hostManager.getSetupCommand()

      sticker
        .add('')
        .add(`Command: ${this.colors.cyan(setup.command)}`)
        .add(`Environment: ${this.colors.yellow(setup.environment)}`)
        .render()

      this.exitCode = 1
    }
  }
}
