import { t } from "elysia";

export const paginationSchema = t.Object({
    page: t.Number(),
    limit: t.Number(),
})

export const ParamsIdSchema = t.Object({
    id: t.Numeric()
})

