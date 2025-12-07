const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(cookieParser());
require("dotenv").config();
const {connectDB} = require("./config/database")
const PORT = process.env.PORT || 4000;
const userRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
connectDB();

app.use(cors({
  origin: "http://localhost:3000",   // your Next dev origin
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,                 // if you use cookies
}));
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/tasks",taskRoutes);
app.get("/",(req,res) => {
    return res.status(200).json({
        message:"Welcome to the E-Learning Platform",
        success:true,
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
