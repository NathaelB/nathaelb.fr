import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import { GuardsList } from '@ioc:Adonis/Addons/Auth'

export default class ManagerAccess {

  protected redirectTo = '/'

  protected async checkAccess (auth: HttpContextContract['auth'], _: (keyof GuardsList)[]) {
    let guardLastAttempted: string | undefined

    if (auth.user?.canAccessPanel) {
      return true
    }

    throw new AuthenticationException(
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
      guardLastAttempted,
      this.redirectTo,
    )
  }

  public async handle(
    {auth}: HttpContextContract,
    next: () => Promise<void>,
    customGuards: (keyof GuardsList)[]
  ) {
    const guards = customGuards.length ? customGuards : [auth.name]
    await this.checkAccess(auth, guards)

    await next()
  }
}
