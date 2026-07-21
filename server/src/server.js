import express from "express";

import recipientRoutes from "./routes/recipientRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();


// Middleware
app.use(express.json());


// API Routes
app.use("/auth", authRoutes);
app.use("/recipients", recipientRoutes);


// Test route
app.get("/", (req, res) => {

    res.json({
        message: "Care System API is running"
    });

});


// Start Server
const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Server running on PORT ${PORT}`);

});