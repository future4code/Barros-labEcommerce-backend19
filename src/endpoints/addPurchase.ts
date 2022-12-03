import { connection } from "../connection";
import { generateId } from "../functions";
import { purchase } from "../types";

export async function addPurchase(purchase:purchase):Promise<void> {
    const id = generateId(30)
    let price = await connection.raw(
        `
            SELECT price FROM labecommerce_products WHERE labecommerce_products.id = "${purchase.product_id}"
        `
    )
    console.log(price[0][0].price);
    
    await connection.raw(
        `
            INSERT INTO labecommerce_purchases (id, user_id, product_id, quantity, total_price)
            VALUES (
                "${id}",
                "${purchase.user_id}",
                "${purchase.product_id}",
                ${purchase.quantity},
                ${price[0][0].price * purchase.quantity}
            );
        `
    )
}