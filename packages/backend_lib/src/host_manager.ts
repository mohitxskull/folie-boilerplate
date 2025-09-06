import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'

export class HostManager {
  private readonly hostname: string
  private readonly ip: string
  private readonly hostsPath: string
  private readonly entry: string

  constructor(config: { hostname: string; ip?: string }) {
    this.hostname = config.hostname
    this.ip = config.ip || '127.0.0.1'
    this.hostsPath = this.getHostsPath()
    this.entry = `${this.ip} ${this.hostname}`
  }

  public get platform() {
    return os.platform()
  }

  public getHostsPath(): string {
    const platform = this.platform

    switch (platform) {
      case 'win32':
        return path.join(
          process.env.SystemRoot || 'C:\\Windows',
          'System32',
          'drivers',
          'etc',
          'hosts'
        )
      case 'darwin':
      case 'linux':
        return '/etc/hosts'
      default:
        throw new Error(`Unsupported platform: ${platform}`)
    }
  }

  public async isEntryPresent() {
    try {
      const hostsContent = await fs.promises.readFile(this.hostsPath, 'utf8')
      const entryRegex = new RegExp(`^\\s*${this.ip}\\s+${this.hostname}(\\s*#.*)?$`, 'm')
      return entryRegex.test(hostsContent)
    } catch (error) {
      return false
    }
  }

  public getSetupCommand() {
    const platform = this.platform
    switch (platform) {
      case 'win32':
        return {
          environment: 'PowerShell as Administrator',
          command: `Add-Content -Path "${this.hostsPath}" -Value "${this.entry}" -Force`,
          platform,
        }
      case 'darwin':
      case 'linux':
        return {
          environment: 'Terminal',
          command: `echo "${this.entry}" | sudo tee -a ${this.hostsPath}`,
          platform,
        }
      default:
        throw new Error(`Unsupported platform: ${platform}`)
    }
  }
}
