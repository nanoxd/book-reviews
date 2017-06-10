const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const pathMatch = require('path-match')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const route = pathMatch()
const match = route('/review/:slug')

String.prototype.isIncluded = function (array) {
  return array.some(s => this.includes(s))
}

app.prepare()
.then(() => {
  createServer((req, res) => {
    const { pathname, query } = parse(req.url, true)
    console.log(pathname)
    const params = match(pathname)

    const rootStaticFiles = [
      '/covers'
    ]

    if (pathname.isIncluded(rootStaticFiles)) {
      console.log("We're In")
      const staticPath = path.join(__dirname, 'static', pathname)
      app.serveStatic(req, res, staticPath)
      return
    }

    if (params === false) {
      handle(req, res)
      return
    }

    // assigning `query` into the params means that we still
    // get the query string passed to our application
    // i.e. /blog/foo?show-comments=true
    app.render(req, res, '/review', Object.assign(params, query))
  })
  .listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
