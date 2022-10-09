/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import View from '@ioc:Adonis/Core/View'
import { DateTime } from 'luxon'

View.global('date', (text: string) => {
  return DateTime.fromISO(text).toFormat('dd/MM/yyyy')
})

View.global('lastWordColor', (sentence: string, ...classes: string[]) => {
  const words = sentence.split(' ')
  const lastWord = words.pop()

  return `${words.join(' ')} <span class="${classes.join(' ')}">${lastWord}</span>`
})
