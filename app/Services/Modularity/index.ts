import { join } from 'node:path'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { string } from '@ioc:Adonis/Core/Helpers'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { readdirSync } from 'fs'

export class ModuleEntity {
  public static migrations: string = join(__dirname, 'Database', 'Migrations')

  public name: string
  public description: string
  public policies: { [K: string]: () => Promise<{readonly default: any}> }

  managerLinks(_context: HttpContextContract): any {}
}

export default class Modularity {
  public modules: ModuleEntity[] = []

  constructor (protected app: ApplicationContract) {}

  public async registerModules (...modules: string[]) {
    await Promise.all(modules.map(async (folder) => {
      const root = join(process.cwd(), 'modules', string.capitalCase(folder))
      await import(join(root, 'routes.ts'))

      const { default: Module } = await import(join(root, 'Module.ts'))
      const module: ModuleEntity = new Module()
      this.modules.push(module)

      const View = this.app.container.resolveBinding('Adonis/Core/View')
      View.mount(string.snakeCase(module.name), join(root, 'Views'))

      const Logger = this.app.container.resolveBinding('Adonis/Core/Logger')
      Logger.debug(`Module ${module.name} was loaded.`)
    }))
  }

  public static getMigrationsSync () {
    const folders = readdirSync('modules')
    return folders.map((folder) => join(process.cwd(), 'modules', folder, 'Database', 'Migrations'))
  }

  public static getSeedersSync () {
    const folders = readdirSync('modules')
    return folders.map((folder) => join(process.cwd(), 'modules', folder, 'Database', 'Seeders'))
  }

  public getLinks (context: HttpContextContract) {
    return {
      alone: this.modules.flatMap((module) => module.managerLinks(context).alone),
      sections: this.modules.flatMap((module) => module.managerLinks(context).sections),
    }
  }

  public getPolicies () {
    return this.modules.reduce((acc, moduleEntity) => ({ ...acc, ...moduleEntity.policies }), {})
  }

  public getModuleFromPolicy (identifier: string) {
    return this.modules.find((module) => Object.keys(module.policies).some((policy) => policy === identifier))
  }
}
