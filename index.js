const hasPromise = 'Promise' in window

// Promisify an elm app to guarantee the app has rendered at least once before
// we start doing things.
//   const node = document.querySelector('#app')
//   const flags = {}
//
//   promisify(Elm.Main, { node, flags })
//     .then(app => {
//       ...
//     })
export const promisify = (elm, { node, flags = {} }) => {
  const app = elm.init({ node, flags })
  const then = f => window.requestAnimationFrame(() => f(app))

  // If the browser doesn't have native Promise support, we return a 'thenable'
  // which mimics the Promise API.
  return hasPromise ? new Promise(then) : { then }
}

// Takes an un-initialised elm app (such as Elm.Main) and returns an objbect
// that mimics the elm app API. Essentially a means of "defering" the promisify
// process if you don't want to init your app right away.
//   const node = document.querySelector('#app')
//   const flags = {}
//
//   const elm = prepare(Elm.Main, { node, flags })
//
//   elm.init({ node, flags })
//     .then(app => {
//       ...
//     })
export const prepare = elm => ({
  init ({ node, flags }) {
    return promisify(elm, { node, flags })
  }
})

// Default export is promisify because I expect that is the one more likely to
// be used
export default promisify
