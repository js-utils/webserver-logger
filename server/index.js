const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')()

app.use(cors())
app.use(bodyParser())
require('snake-logger')(app)

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    // console.log(err)
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
})

router.post('/', async (ctx) => {
  if (ctx.request.body && ctx.request.body.message) {
    ctx.logger.info(`${ ctx.request.body.message }\n\n================================================\n\n`)
  }
  ctx.status = 204
})

app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());

app.listen(3000, function() {
  console.log(`http://localhost:3000`)
})
