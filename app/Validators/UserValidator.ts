import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    avatar: schema.file.optional(),
    firstname: schema.string({ trim: true }),
    lastname: schema.string({ trim: true }),
    description: schema.string({ trim: true })
  })

  public messages: CustomMessages = {}
}
