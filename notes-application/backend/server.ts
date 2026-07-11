import app from "./src/app.ts";
import dotenv from "dotenv";
import connectDb from "./src/config/db.ts";
dotenv.config();
const PORT = process.env.PORT || 5000

const startServer = async ():Promise <void> => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
  });
};

startServer();
