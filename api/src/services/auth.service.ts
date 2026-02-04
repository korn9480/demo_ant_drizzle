import { database } from "@/db";
import { UserCreated } from "@/dto/user";
import { eq } from "drizzle-orm";
import * as schema from "drizzle/schema";

export class AuthService {
    private readonly userTable = schema.user

    async register(data: UserCreated) {
        const [result] = await database.insert(this.userTable).values(data)
        const user = await database.select().from(this.userTable).where(eq(this.userTable.id, result.insertId))
        return user[0]
    }

    async findByUsername(username: any) {
        const [user] = await database.select().from(this.userTable).where(eq(this.userTable.username, username))
        return user
    }
}