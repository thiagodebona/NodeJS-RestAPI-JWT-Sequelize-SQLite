const express = require('express');
const morgan = require('morgan');
var fs = require('fs');
var path = require('path');

//Import and initialise the environment variables - stored in .dotenv file in project root
require('dotenv').config();

//Import Routes
const authRoutes = require('./routes/auth');
const moviesRoutes = require('./routes/movies');

//Initialise Express
const app = express();
app.use(express.json());

// Logging requests
app.use(morgan('short', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs/requests.log'), { flags: 'a' })
}))

//Set up API routes
app.get('', function (req, res) { res.sendFile(path.join(__dirname, 'assets/index.html')); });
app.use('/api/user', authRoutes);
app.use('/api/movies', moviesRoutes);

//404 Error route as a catch-all
app.use((req, res, next) => {
    res.status(404).send("Error 404 - Resource not found");
});

//Set default port to serve app on
const port = process.env.PORT || 3000;

app.listen(port, console.log(`App running on port: ${port}`));