import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run () {
    await Role.createMany([
      { label: 'Administrateur', power: 100 },
      { label: 'Développeur', power: 90 },
      { label: 'Rédacteur', power: 80 },
      { label: 'Membre', power: 0 },
    ])
  }
}
