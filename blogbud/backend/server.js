require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const path = require("path");
const blogRoutes = require("./routes/blogs");
const userRoutes = require("./routes/users");
const errorMiddleware = require("./middleware/errorMiddleware");

const port = process.env.PORT || 3000;

// express app
const app = express();

connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.use(errorMiddleware.requestLogger);

app.get("/", (req, res) => res.send("API Running!"));

// routes
app.use("/api/blogs", blogRoutes);

app.use("/api/users", userRoutes);

app.use(errorMiddleware.unknownEndpoint);

app.use(errorMiddleware.errorHandler);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
