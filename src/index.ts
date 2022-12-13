import express, {Request, Response} from "express"

import cors from 'cors'
import { products, purchase, users } from "./types"
import { addNewUser } from "./endpoints/addNewUser"
import { addNewProduct } from "./endpoints/addNewProduct"
import { connection } from "./connection"
import { addPurchase } from "./endpoints/addPurchase"
import { getUserPurchase } from "./endpoints/getUserPurchase"
import { AddressInfo } from "net"

const app = express()

app.use(express.json())

app.use(cors())

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running at localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);   
    }
});

// add new user

app.post("/users", async(req:Request, res:Response):Promise<void> => {
    const body:users = req.body;
    let errorCode = 400
    try {
        if (!body) {
            throw new Error("Body is missing or has a syntax error");
        }
        await addNewUser(body)
        res.status(201).send("Success!")
    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
})

// get all users

app.get("/users", async(req:Request, res:Response) => {
    try {
        let result = await connection.raw(
            `
                SELECT * FROM labecommerce_users;
            `
        )
        res.status(200).send(result[0])
    } catch (error:any) {
        res.status(500).send(error.message)
    }
})

// add new product

app.post("/products", async(req:Request, res:Response) => {
    const body:products = req.body
    let errorCode = 400
    try {
        if (!body) {
            throw new Error("Body is missing or has a syntax error");
        }
        await addNewProduct(body)
        res.status(201).send("Success!")
    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
})

// get all products

app.get("/products", async(req:Request, res:Response) => {
    try {
        let result = await connection.raw(
            `
                SELECT * FROM labecommerce_products;
            `
        )
        res.status(200).send(result[0])
    } catch (error:any) {
        res.status(500).send(error.message)
    }
})

// purchase a product

app.post("/purchases", async(req:Request, res:Response) => {
    const body:purchase = req.body;    
    try {
        if (!body) {
            throw new Error("Body is missing or has a syntax error");
        }
        await addPurchase(body)
        res.status(201).send("Success!")
    } catch (error:any) {
        res.send(400).send(error.message)
    }
})

// get user purchase data

app.get("/users/:user_id/purchases", async(req:Request, res:Response) => {
    const userId = req.params.user_id as string;
    let errorCode = 400
    try {
        if (!userId) {
            throw new Error("Missing params.");
        }
        let result = await getUserPurchase(userId)
        res.status(200).send(result)
    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
})
