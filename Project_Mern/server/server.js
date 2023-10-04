const express = require("express");
const cors = require("cors");
const app = express();
const cookies = require("cookie-parser");
require("dotenv").config();

// GLOBAL VARIABLES
const PORT = process.env.PORT;
const DB = process.env.DB;

app.use(express.static('public'));

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  cors({ credentials: true, origin: "http://localhost:3000" }),
  cookies()
);

require("./config/mongoose.config")(DB);

require("./routes/service.routes")(app);
require("./routes/user.routes")(app);

app.listen(PORT, () =>
  console.log(`🚀🚀🚀🚀 >>> SERVER IS RUNNING ON PORT ${PORT} <<< 🚀🚀🚀`)
);
