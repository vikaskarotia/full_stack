 import mongoose from "mongoose";

export const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URI ,
{dbName:"todoApp"})
.then(()=>{console.log("database is connected")})
.catch((e)=>{console.log(e)})

  
}