const {createServer} = require('http');
const express = require('express');
var request = require('request');
const app = express();
const dev = app.get('env') !== 'production';
const path = require('path');

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

if(!dev){
    app.disable('x-powered-by');
    app.use(express.static(path.resolve(__dirname, 'frontend/build')))

    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
    });

}

if(dev){
    app.listen(PORT,() => console.log(`server started`));
}

app.get('/', function (req, res) {
    res.send("hello world")
});

app.get('/flickr', function (req, res) {
    const {tags} = req.query;
    request(`https://www.flickr.com/services/feeds/photos_public.gne?method=flickr.photos.search&api_key=40df07ad4afde0d9f8776f875a2ac847&safe_search=true&format=json&nojsoncallback=1&tags=${tags}`, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        var parsedBody = JSON.parse(body);
        // var arr = parsedBody["results"];
        // res.send(arr)
        // console.log(typeof (parsedBody.items))
        res.send(parsedBody.items)
    });
});



