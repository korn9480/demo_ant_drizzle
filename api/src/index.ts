import { Elysia, NotFoundError } from "elysia";
import { jwt } from '@elysiajs/jwt'
import { AuthRouter } from "./routers/auth.router";
import { envConfig } from "./config/env";
import { ForbiddenError, UnauthorizedError } from "./middlewares/error";
import { PostRouter } from "./routers/post.router";

const authRouter = new AuthRouter()
const postRouter = new PostRouter()

const app = new Elysia({ prefix: "/api" })
  .use(jwt({
    name: "jwt",
    secret: envConfig.JWT_SECRET,
    exp: "1d"
  }))
  .onBeforeHandle((req) => {
    console.log(`${req.request.method} ${req.route}`)
  }).error({ UnauthorizedError, ForbiddenError, NotFoundError }).onError(({ code, error }) => {
    if (code === 'VALIDATION') {
      const formattedError = error.all.map((error) => {
        let path = error.path.replace("/", "")
        return {
          path: path.replaceAll("/", "."),
          message: error.message
        }
      })
      return formattedError
    }

    return {
      error: error instanceof Error ? error.message : 'Internal Server Error',
      status: 500
    }
  })
  .use(authRouter.routers())
  .use(postRouter.routers())
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
