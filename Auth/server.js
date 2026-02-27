require("dotenv").config()
const app = require("./src/app");
const connecToDb = require("./src/config/database");

connecToDb()

app.listen(3000, () => console.log("Server is running on port 3000"))