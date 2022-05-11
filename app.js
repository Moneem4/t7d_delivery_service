require("dotenv").config();

const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const deliveryServiceRoute = require("./routes/deliveryService");

const app = express();
app.use(express.json());



app.use("/api/deliveryService", deliveryServiceRoute);

const PORT = process.env.PORT || 3006;

// connectDB();

app.listen(PORT, () => {
  console.log(`Server listning on port ${PORT}`);
});
