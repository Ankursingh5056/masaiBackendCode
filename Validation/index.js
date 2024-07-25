const express = require('express');
const logger = require('./src/logger'); // Adjust the path if necessary

const app = express();

// Use the logger middleware
app.use(logger);

// Define your routes
app.get('/', (req, res) => {
  return res.status(200).json({ message: "welcome to server" });
});

app.get('/get-users', (req, res) => {
  return res.status(200).json({ message: "here is the list of all users" });
});

app.post("/add-user", (req, res) => {
  return res.status(201).json({ message: "user added successfully" });
});

app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  return res.status(201).json({ message: `user ${id} updated successfully` });
});

app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  return res.status(201).json({ message: `user ${id} deleted successfully `});
});

// Start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;