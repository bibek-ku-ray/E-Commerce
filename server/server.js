const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT | 3001;
const authRouter = require("./routes/auth/auth-route")

mongoose
  .connect(
    "mongodb+srv://devbibek25:aq5ww3Uuq55SQO85@clusterecommece.dpyc8.mongodb.net/"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Not connected to MongoDB :: ", err));

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Exires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// route
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
