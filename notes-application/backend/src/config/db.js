import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
    console.log("Database connected success!");
    } catch (error) {
        console.log("MONGODB ERROR", error);
        
        process.exit(1)
    }
    
}

export default connectDb