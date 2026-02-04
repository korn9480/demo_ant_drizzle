import { t } from "elysia";

export const userSchema = t.Object({
    username: t.String(),
    password: t.String(),
    profile: t.String(),
    fullname: t.String(),
})

export const userLoginSchema = t.Pick(userSchema, ["username", "password"])