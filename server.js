// Simple Express Server that will handle the Github Requests
const express = require("express");
const cors = require("cors"); // For development, handle CORS

const app = express();
// MAKE CONFIGURABLE!!!
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Example API Endpoint
app.get("/api/data", (req, res) => {
  res.json({ message: "Data fetched from Express API!" });
});

app.use("/api/search/repos", require("./routes/api/repos"));
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
