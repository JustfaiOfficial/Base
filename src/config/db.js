const mongoose=require("mongoose")

const conncetDB= async()=>{
    try{
        await mongoose.connect(process.env.mongooseURL)
        console.log("Database Connected")
    }
    catch(err){
        console.log("Failed to conncet database",err)
    }
};
export default conncetDB