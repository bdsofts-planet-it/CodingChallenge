const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const sampleRoute = require("./routes/sample.route");
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", sampleRoute);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', './views/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
