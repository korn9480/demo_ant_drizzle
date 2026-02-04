import { t } from "elysia";

export const postSchema = t.Object({
    titile: t.String(),
    details: t.Optional(t.String()),
    userId: t.Number(),
    post_image: t.Optional(t.Array(t.Object({
        urlImage: t.String()
    })))
})