import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'modules/Blog/Database/Models/Article'
import Achievement from '../../../../modules/Achievement/Database/Models/Achievement'

export default class DefaultsController {
  public async home ({ view }: HttpContextContract) {
    const articles = await Article.query()
      .where('is_visible', true)
      .orderBy('id', 'desc')
      .preload('category')
      .preload('tags')
      .limit(5)

    const achievements = await Achievement.query()
      .where('is_visible', true)
      .orderBy('id', 'desc')
      .limit(9)

    return view.render('index', { articles, achievements })
  }
}
