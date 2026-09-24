const express = require("express");

const app = express();

const studentRoutes = require("./routes/studentRoutes");
const logger = require("./middleware/logger");


// Middleware
app.use(express.json());
app.use(logger);


// Routes
app.use("/students", studentRoutes);


// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Student Management REST API is running"
    });
});


// Global error handling
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: "Something went wrong"
    });
});


// Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
