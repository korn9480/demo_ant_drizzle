import { Elysia } from "elysia";
import { PostController } from "@/controllers/post.controller";
import { postSchema } from "@/schemas/post.shema";
import { ParamsIdSchema } from "@/schemas/index.shema";

export class PostRouter {
    private router = new Elysia({ prefix: "/post" })

    private postController = new PostController()

    routers = () => {
        this.router.get("/", this.postController.getAllPost)
        this.router.get("/:id", this.postController.getPostById, {
            params: ParamsIdSchema
        })
        this.router.post("/", this.postController.createPost, {
            body: postSchema
        })
        this.router.put("/:id", this.postController.updatePost, {
            params: ParamsIdSchema,
            body: postSchema
        })
        this.router.delete("/:id", this.postController.deletePost, {
            params: ParamsIdSchema
        })
        return this.router
    }
}