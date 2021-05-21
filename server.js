const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiRoutes = require('./routes/routes.js');


app.use(bodyParser.urlencoded({ extended: true }));
apiRoutes.use(bodyParser.json())
app.use(apiRoutes);
const port = 8080;


app.get('/', (req, res) => {
    res.status(200);
    res.send("hello");
})

app.use('/api', apiRoutes);

const server = http.createServer(app);
app.listen(port, function(err) {
    if (err) {
        console.log("Error in the server");
    }
    console.log("Server listening on port: " + port);
});

module.exports = app;