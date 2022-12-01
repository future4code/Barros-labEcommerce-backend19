import express, {Request, Response} from "express"

import cors from 'cors'
import { products, users } from "./types"
import { addNewUser } from "./endpoints/addNewUser"
import { addNewProduct } from "./endpoints/addNewProduct"
import { connection } from "./connection"

const app = express()

app.use(express.json())

app.use(cors())

app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});

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
