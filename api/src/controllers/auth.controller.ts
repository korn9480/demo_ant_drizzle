import { UserCreated, UserLogin } from "@/dto/user";
import { AuthService } from "@/services/auth.service";
import { Context } from "elysia";
import type { JWTPayloadInput, JWTPayloadSpec } from "@elysiajs/jwt";
import { NotFoundError, UnauthorizedError } from "@/middlewares/error";

export type ContextJWT<T extends Record<string, any> = {}> = Context<T> & {
    jwt?: {
        sign: (payload: JWTPayloadInput & Record<string, any>) => Promise<string>;
        verify: (token: string) => Promise<(JWTPayloadSpec & { username?: string } & Record<string, any>) | false>;
    }
}

export class AuthController {
    private authController = new AuthService()

    login = async (req: ContextJWT<{ body: UserLogin }>) => {
        const user = await this.authController.findByUsername(req.body.username || "")
        if (!user) {
            throw new NotFoundError("user")
        }
        const isPasswordValid = await Bun.password.verify(req.body.password || "", user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedError()
        }
        const token = await req.jwt?.sign({
            id: user.id,
            username: user.username,
        })

        if (token) {
            req.cookie.auth.set({
                value: token,
                httpOnly: true,
                secure: true,
                maxAge: 1 * 86400, // 1 days
                path: '/',
            })
        }

        return {
            message: "Login successful"
        }
    }

    register = async (req: Context<{ body: UserCreated, }>) => {
        const { password, ...rest } = req.body
        const userExist = await this.authController.findByUsername(rest.username || "")
        if (userExist) {
            throw new Error("User already exists")
        }
        const hashPassword = await Bun.password.hash(password!, {
            algorithm: "bcrypt",
            cost: 10
        })
        const { password: _, ...user } = await this.authController.register({ ...rest, password: hashPassword })
        return {
            data: user
        }
    }

    verifyToken = async (req: ContextJWT) => {
        const token = req.cookie.auth.value as string
        if (!token) {
            throw new Error("Unauthorized")
        }

        const payload = await req.jwt?.verify(token)
        if (!payload || typeof payload.username !== 'string') {
            throw new Error("Invalid token")
        }

        const { id, username } = payload
        return {
            data: { id, username }
        }
    }
}