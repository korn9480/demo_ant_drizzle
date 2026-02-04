import { PostService } from "@/services/post.service";
import { Context } from "elysia";
import { PostCreated, PostFullCreated } from "@/dto/post";

export class PostController {
    
    private readonly postService = new PostService()

    createPost = async (req: Context<{ body: PostFullCreated }>) => {
        const postId = await this.postService.createPost(req.body)
        const result = await this.postService.getPostById(postId)
        return {
            data: result
        }
    }

    getAllPost = async (req: Context) => {
        const posts = await this.postService.getAllPost()
        return {
            data: posts
        }
    }

    getPostById = async (req: Context<{params: {id: number}}>) => {
        const post = await this.postService.getPostById(req.params.id)
        return {
            data: post
        }
    }

    updatePost = async (req: Context<{params: {id: number}, body: PostCreated}>) => {
        const post = await this.postService.updatePost(req.params.id, req.body)
        return {
            data: post
        }
    }

    deletePost = async (req: Context<{params: {id: number}}>) => {
        const post = await this.postService.deletePost(req.params.id)
        return {
            data: post
        }
    }
}