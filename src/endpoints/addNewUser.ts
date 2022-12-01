import { connection } from "../connection";
import { generateId } from "../functions";
import { users } from "../types";

export async function addNewUser(user:users):Promise<void> {
    const id = generateId(30)
        await connection.raw(
            `
                INSERT INTO labecommerce_users (id,name,email,password)
                VALUES(
                    "${id}",
                    "${user.name}",
                    "${user.email}",
                    "${user.password}"
                );
            `
        )
}