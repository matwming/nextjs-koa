const Koa = require("koa");
const next = require("next");
const Route = require("koa-router");
const session = require("koa-session");
const dev = process.env.NODE_ENV !== "production";
const RedisSessionStore = require("./server/session-store");
const Redis = require("ioredis");
const app = next({ dev });
const router = new Route();

const handle = app.getRequestHandler();

const redis = new Redis();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Route();

  server.keys = ["ming develop github app"];
  const SESSION_CONFIG = {
    key: "jid",
    store: new RedisSessionStore(redis)
  };
  server.use(session(SESSION_CONFIG, server));
  server.use(async (ctx, next) => {
    //   //console.log("ctx.cookies", ctx.cookies.get("id"));
    //   if (!ctx.session.user) {
    //     ctx.session.user = {
    //       name: "ming",
    //       age: 18
    //     };
    //   } else {
    console.log("session is :", ctx.session);
    //   }
    await next();
  });
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

  router.get("/set/user", async ctx => {
    ctx.session.user = {
      name: "ming",
      age: 18
    };
    ctx.body = "set session success";
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    //const path=ctx.path; get path
    //const method=ctx.method;
    //ctx.body=`<span></span>`
    // ctx.cookies.set("id", "userId:****", {
    //   httpOnly: false
    // });

    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.listen(3000, () => {
    console.log("koa server listening on 3000");
  });
});
