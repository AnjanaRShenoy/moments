import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
dotenv.config()
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port= process.env.PORT || 5000
// import userRoutes from './userRoutes.js'
import router from "./routes/userRoutes.js";
import adminRoute from "./routes/adminRoutes.js"
// import fileUpload from "express-fileupload";
// import morgan from "morgan";

connectDB()
const app= express()
// app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())
app.use('/api/users', router)
app.use('/api/admin', adminRoute)

app.get('/',(req,res)=>
    res.send('server is ready')
)

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>console.log(`server is running in ${port}`))


