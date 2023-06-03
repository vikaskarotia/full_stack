
import { app } from "./app.js";
import { connectDb } from "./data/dataBase.js";


connectDb();

app.listen(process.env.PORT,(req,res)=>{
    console.log("server is connected");
})