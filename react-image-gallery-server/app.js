// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Define the port for the server, using the value from environment variables or defaulting to 5000
const port = process.env.PORT || 5000;

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Default route
app.get('/', (req, res) => {
    res.send('React Image Gallery Server is Running');
});

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`React Image Gallery Server is running on Port ${port}`);
});
