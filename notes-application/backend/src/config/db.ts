import mongoose from "mongoose";
const connectDb = async ():Promise<void> => {

  try {
    const mongoUri = process.env.MONGO_URI

    if(!mongoUri){
      throw new Error("MONGO_URI is not defined in environment variables.");
    }
    await mongoose.connect(mongoUri);
    console.log("Database connected successfully!");

  } catch (error) {
      if(error instanceof Error){
        console.log("MONGODB ERROR:", error.message);
      }else{
          console.log("MONGODB ERROR:", error);
      }

    process.exit(1);
  }
};

export default connectDb;
