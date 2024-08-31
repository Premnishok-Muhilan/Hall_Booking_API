const express = require("express");
const app = express();
const hallRoutes = require("./routes/hallRoutes");

// Use middleware for parsing JSON data
app.use(express.json());

// Default route
app.get("/api/v1", (req, res) => {
  res.send("Hello using Express JS! Welcome to the Hall API Task!");
});

// hall routes
app.use("/api/v1", hallRoutes);

// Start the server
app.listen(3001, () => {
  console.log("Express server listening on port 3001");
});
