const app = require("./src/app.js");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.js");
dotenv.config();
const port = process.env.PORT;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => console.log(`Server is running on port: ${port}`));
};

startServer();
