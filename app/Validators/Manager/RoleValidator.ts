import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class RoleStoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    label: schema.string({ trim: true }),
    power: schema.number(),
  })

  public messages: CustomMessages = {
    required: 'Le champ {{ field }} est requis',
  }
}

export class RoleUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    label: schema.string({ trim: true }),
    power: schema.number(),
  })

  public messages: CustomMessages = {
    required: 'Le champ {{ field }} est requis',
  }
}
