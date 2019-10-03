import { Elm } from './Main.elm'
import { elmPromisify } from '../index'

const node = document.querySelector('#app')
const flags = {}

elmPromisify(Elm.Main, { node, flags }).then(app => {
  // Set up your elm => js ports here
  app.ports.foo.subscribe(message => {
    console.log(message)
  })

  // Set up your js => elm ports here
  document.addEventListener('keydown', ({ key }) => {
    app.ports.bar.send(key)
  })

  // Do something with the DOM generated by elm here
  console.log(document.querySelector('.created-by-elm'))
})