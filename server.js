const Koa = require("koa");
const next = require("next");
const Route = require("koa-router");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const router = new Route();

const handle = app.getRequestHandler();

let index=0;
app.prepare().then(() => {
  const server = new Koa();
  const router = new Route();

  router.get("/a/:id", async ctx => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: "/a",
      query: {
        id
      }
    });
    ctx.respond = false;
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    //const path=ctx.path; get path
    //const method=ctx.method;
    //ctx.body=`<span></span>`
    ctx.cookies.set('id',index);
    index+=1;
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.listen(3000, () => {
    console.log("koa server listening on 3000");
  });
});
