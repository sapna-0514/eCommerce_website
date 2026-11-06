import express from 'express';
import { v2 as cloudinary } from "cloudinary";
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRoute.js';
import caartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import chatbotRouter from './routes/chatbotRoute.js';

//app config
 const app=express();
  const port=process.env.PORT || 4000;

const startServer = async () => {
    try {
        await connectDB();
        await connectCloudinary();

        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });

    } catch (error) {
        console.log("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();

  //middlewares
  app.use(express.json());
  app.use(cors())

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',caartRouter);
app.use('/api/order',orderRouter)
app.use('/api/chat', chatbotRouter);

app.get("/",(req,res)=>{
    res.send("API WORKING")
})
app.listen(port,()=>{
    console.log("server started on http://localhost:4000")
})
app.get("/test", async (req, res) => {
    try {
        const result = await cloudinary.api.ping();
        console.log(result);
        res.json(result);
    } catch (err) {
        console.log("ERROR:", err);
        console.log("MESSAGE:", err.message);
        console.log("HTTP:", err.http_code);

        res.json({
            message: err.message,
            code: err.http_code
        });
    }
});