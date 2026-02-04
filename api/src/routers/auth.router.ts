import { AuthController } from "@/controllers/auth.controller";
import { userLoginSchema, userSchema } from "@/schemas/user.shema";
import { Elysia, t } from "elysia";

export class AuthRouter {
    private router = new Elysia({ prefix: "/auth" })

    private authController = new AuthController()

    routers = () => {
        this.router.post("/login", this.authController.login, {
            body: userLoginSchema
        })
        this.router.post("/register", this.authController.register, {
            body: userSchema
        })

        this.router.get("/verify", this.authController.verifyToken)

        return this.router
    }
}