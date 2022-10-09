import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UserStoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    lastname: schema.string({ trim: true }),
    firstname: schema.string({ trim: true }),
    isStaff: schema.boolean.optional(),
    canAccessPanel: schema.boolean.optional(),
    email: schema.string({ trim: true }, [rules.email(), rules.unique({ column: 'email', table: 'users' })]),
    password: schema.string({ trim: true }, [rules.confirmed()])
  })

  public messages: CustomMessages = {
    required: 'Le champ {{ field }} est requis',
  }
}

export class UserUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    lastname: schema.string({ trim: true }),
    firstname: schema.string({ trim: true }),
    isStaff: schema.boolean.optional(),
    canAccessPanel: schema.boolean.optional(),
    email: schema.string({ trim: true }, [rules.email()]),
    password: schema.string.optional({ trim: true }, [rules.confirmed()])
  })

  public messages: CustomMessages = {
    required: 'Le champ {{ field }} est requis',
  }
}
