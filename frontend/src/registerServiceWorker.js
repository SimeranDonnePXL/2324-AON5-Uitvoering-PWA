/* eslint-disable no-console */

import { register } from 'register-service-worker'

//navigator is een js object met alle informatie over de browser
//in de if else statement hieronder kijken we of de browser een property heeft genaamd service worker
//dus we kijken of de browser service workers support of niet.
if('serviceWorker' in navigator){
  register(`/service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}

