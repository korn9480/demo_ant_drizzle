import * as schema from "drizzle/schema";
import * as relations from "drizzle/relations";

export type PostImageCreated = typeof schema.postImage.$inferInsert

export type PostCreated = Omit<typeof schema.post.$inferInsert, 'id' | 'createdAt' | 'updatedAt'> & {
    id?: number
    createdAt?: string
    updatedAt?: string
}

export type PostFullCreated = PostCreated & {
    post_image?: PostImageCreated[]
}