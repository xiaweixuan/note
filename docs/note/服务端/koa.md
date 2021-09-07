简易版koa

```JavaScript
// 封装
const http = require('http')

class Application {
  constructor() {
    this.middlewares = []
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = new Context(req, res)

      await runMiddlewares(this.middlewares, ctx)

      ctx.res.end(ctx.body)
    })
    server.listen(...args)
  }

  use(middleware) {
    this.middlewares.push(middleware)
  }
}

class Context {
  constructor(req, res) {
    this.req = req
    this.res = res
  }
}

async function runMiddlewares(middlewares, ctx) {
  const run = async (i) => {
    const middleware = middlewares[i]
    if (i === middlewares.length) {
      return
    }
    await middleware(ctx, () => run(i + 1))
  }
  await run(0)
}

module.exports = Application;
// 使用
const Application = require('./index')
const app = new Application()

app.use(async (ctx, next) => {
  console.log('Middleware 1 Start')
  await next()
  console.log('Middleware 1 End')
})

app.use(async (ctx, next) => {
  console.log('Middleware 2 Start')
  await next()
  console.log('Middleware 2 End')
})

app.listen(4000)
```

