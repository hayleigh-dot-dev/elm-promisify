# elm-promisify

Occasionally it is desirable or necessary to do something in javascript
immediately after your elm app has been initialised. If that something requires
elm to have rendered first then it means you have to wrap that code in a callback
to `requestAnimationFrame` like so:

```javascript
import { Elm } from './Main.elm'

const app = Elm.Main.init({
  node: document.querySelector('#app')
})

window.requestAnimationFrame(() => {
  const node = document.querySelector('.created-by-elm')

  ...
})
```

I've notice this trip a few people up on the Elm slack in the past, not realising
that they need to do this. I also find the code written this way to be a bit
ugly. To rememdy this I've created **elm-promisify** that turns elm app
initialisation into a promise (or a 'thenable' if promises aren't supported in
your browser).

The above code can now be rewritten:

```javascript
import { Elm } from './Main.elm'
import { promisify } from 'elm-promisify'

promisify(Elm.Main, { node: document.querySelector('#app') })
  .then(app => {
    const node = document.querySelector('.created-by-elm')

    ...
  })
```

Or if you don't want/need to initialise the app immediately, you can do:

```javascript
import { Elm } from './Main.elm'
import { prepare } from 'elm-promisify'

const elm = prepare(Elm.Main)

...

elm.init({ node: document.querySelector('#app') })
  .then(app => {
    const node = document.querySelector('.created-by-elm')

    ...
  })
```

Although a small and simple change, I feel this cleans up the code nicely and
communicates intent much better. Hopefully this helps a couple of people out!
