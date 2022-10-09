import Unpoly from './index'

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    up: Unpoly
  }
}
