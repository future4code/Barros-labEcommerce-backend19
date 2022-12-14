export type users = {
    name:string,
    email:string,
    password:string
}

export type products = {
    name: string,
    price:number,
    image_url:string
}

export type purchase = {
    user_id: string,
    product_id: string,
    quantity: number
}