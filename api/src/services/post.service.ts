import { database } from "@/db";
import { PostCreated, PostFullCreated, PostImageCreated } from "@/dto/post";
import { eq } from "drizzle-orm";
import * as schema from "drizzle/schema";

export class PostService {
    private readonly postTable = schema.post

    async createPost(data: PostFullCreated) {
        const { post_image, ...postData } = data

        const [result] = await database.insert(this.postTable).values({
            ...postData,
            titile: postData.titile!,
            userId: postData.userId!,
        })

        const postId = result.insertId

        if (post_image && post_image.length > 0) {
            const postImage = post_image.map((img) => ({
                urlImage: img.urlImage,
                postId: postId,
                ...(img.id && { id: img.id })
            }))
            await database.insert(schema.postImage).values(postImage as PostImageCreated[])
        }

        return postId
    }

    async getAllPost() {
        return await database.query.post.findMany({
            columns: {
                createdAt: false,
                updatedAt: false
            },
            with: {
                postImages: true
            }
        })
    }

    async getPostById(id: number) {
        return await database.query.post.findFirst({
            where: (post, { eq }) => eq(post.id, id),
            columns: {
                createdAt: false,
                updatedAt: false
            },
            with: {
                postImages: true
            }
        })
    }

    async updatePost(id: number, data: PostFullCreated) {
        const { post_image, ...postData } = data
        await database.update(this.postTable).set({
            ...postData,
            updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
        } as PostCreated).where(eq(this.postTable.id, id))

        return await database.query.post.findFirst({
            where: (post, { eq }) => eq(post.id, id),
            with: {
                postImages: true
            }
        })
    }

    async deletePost(id: number) {
        const [result] = await database.delete(this.postTable).where(eq(this.postTable.id, id))
        return result
    }
}