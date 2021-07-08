const express = require('express');
const cors = require('cors')
const http = require('http');
const app = express();
app.use(cors());
app.use("/blocks", require("./routes/blocks/v1a"));

const server =  http.createServer(app);

const port = process.env.PORT || 3002;
const hostname = 'localhost';
server.listen(port, err => {
    if(err){
        return console.log("Error", err)
    }
    console.log(`Backend Server running on http://${hostname}:${port} ...`)
});