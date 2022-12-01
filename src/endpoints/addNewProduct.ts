import { connection } from "../connection";
import { generateId } from "../functions";
import { products } from "../types";

export async function addNewProduct(products:products):Promise<void> {
    const id = generateId(30)
        await connection.raw(
            `
                INSERT INTO labecommerce_products (id,name,price,image_url)
                VALUES(
                    "${id}",
                    "${products.name}",
                    "${products.price}",
                    "${products.image_url}"
                );
            `
        )
}