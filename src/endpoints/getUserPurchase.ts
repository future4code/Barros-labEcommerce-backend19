import { connection } from "../connection";

export async function getUserPurchase(user_id:string) {
    let result = await connection.raw(
        `
        SELECT labecommerce_purchases.id, labecommerce_users.name, labecommerce_products.name as product_name, labecommerce_purchases.quantity, labecommerce_purchases.total_price, labecommerce_products.image_url FROM labecommerce_users
        JOIN labecommerce_purchases
        ON "${user_id}" = labecommerce_purchases.user_id AND "${user_id}" = labecommerce_users.id
        JOIN labecommerce_products
        ON labecommerce_products.id = labecommerce_purchases.product_id;
        `
    )
    return result[0]
}