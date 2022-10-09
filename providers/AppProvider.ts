import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Modularity from '../app/Services/Modularity'

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
    this.app.container.singleton('Adonis/modules/Modularity', () => new Modularity(this.app))
  }

  public async boot () {
    const modularity: Modularity = this.app.container.resolveBinding('Adonis/modules/Modularity')
    await modularity.registerModules()
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
