import  express  from "express";
import router from "./routes/user.js";
import taskRouter from "./routes/task.js";
import  {config}  from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

 export const app=express();

config({
    path:"./data/config.env"
})
 
//using middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URI],
    methods:["GET","PUT","POST","DELETE"],
    credential:true,
}))

//using routes
app.use("/api/v1/users",router)
app.use("/api/v1/task",taskRouter)

//using error middleWare
app.use(errorMiddleware)


