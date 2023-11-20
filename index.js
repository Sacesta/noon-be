require("dotenv").config();
const connectDb = require("./src/utils/connectDb");
const config = require("config");
const PORT = config.get("port");

const app = require("./app");

const server = app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running on port`, server.address().port);
});
