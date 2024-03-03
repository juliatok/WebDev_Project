require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const blogRoutes = require("./routes/blogs");
const userRoutes = require("./routes/users");
const middleware = require("./middleware/middleware");

// express app
const app = express();

const port = process.env.PORT || 3002;
connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.get("/", (req, res) => res.send("API Running!"));

// routes
app.use("/api/blogs", blogRoutes);

app.use("/api/users", userRoutes);

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
