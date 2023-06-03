import Errorhander from "../middlewares/error.js";
import { Task } from "../models/Task.js";

export const getMytask=async(req,res,next)=>{
   try {
    const userid=  req.user._id;

    const task= await Task.find({user:userid});

    if(!task){
        return next(new Errorhander("task not found",404));     

    }

    res.json({
        success:true,
        task,
    })
   } catch (error) {
    next(error)
   }

} 


 export const newTask=async(req,res,next)=>{
try {
  
    const {title, description}=req.body;
   
  const task=  await Task.create({
    title,
    description,
        user:req.user,
    })
   
    res.status(201).json({
        success:true,
        message:"task added successfully",
        task,
    })  
} catch (error) {
   next(error) 
}

 }


 export const updateTask=async(req,res,next)=>{
try {
    const task=await Task.findById(req.params.id)

   if(!task){
    return next(new Errorhander("task not found",404));     
  
   }
   
   task.isCompleted=!task.isCompleted;

   await task.save();
    res.status(200).json({
        success:true,
        message:"task updates successfully",
      

 }) 
} catch (error) {
    
    next(error)
}
  
}


export const deleteTask=async(req,res,next)=>{
try {
    
    const task=await Task.findById(req.params.id)

    if(!task){
        return next(new Errorhander("task not found",404));     
    }
    
   
    await task.deleteOne();

     res.status(200).json({
         success:true,
         message:"task deleted successfully",
       
 
  })
} catch (error) {
    next(error)
}

 }