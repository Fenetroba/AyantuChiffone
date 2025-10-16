import express, { json } from 'express';
import "dotenv/config";
import  cors from 'cors'
import UserAuth from './Routers/UserAuth.router.js'
import connectDB from './DB/Db.js';
import cookieParser from 'cookie-parser'
const app=express();
app.use(express.json())
app.use(cookieParser())
const PORT=process.env.PORT || 5000


app.use(cors({origin:"http//localhost:5173"
            
}))

app.use('/api/auth',UserAuth)

app.listen(PORT,()=>{
     connectDB()
     console.log("server connected with port",PORT)
})





