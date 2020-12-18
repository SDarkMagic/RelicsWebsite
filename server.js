const express = require('express')
const mime = require('node-mime')
const path = require('path')
const fs = require('fs')
const server = express()
const port = 4000

//Adds the "web" folder to the available server urls
server.use(express.static('web'));

/*
// Handles errors
server.use(function (err, req, res, next) {
    console.warn(err.stack)
    console.log('this is the error specific function, here is the error ' + err)
});
*/

// Sends any requests to the base url to the index page
server.get('/', (req, res) => {
    res.sendFile(__dirname + '/web/home.html')
});

// Attempts to forward any requests from /{var} to a corresponding HTML page
server.get('/:pageName', (req, res) => {
    pageName = req.params['pageName']
    page = `${__dirname}/web/${pageName}.html`
    if (fs.existsSync(page)) {
        res.sendFile(page)
    }
    else {
        res.status(404).sendFile(`${__dirname}/web/404.html`)
    };
});

// Sends the official WiiU release build Zip
server.get('/WiiU-Release', (req, res) => {
    var file = `${__dirname}/web/assets/ModFiles/WiiU/breathofthewild_relics_of_the_past__e0751.zip`;
    res.download(file, 'RelicsOfThePast_Official-Release-WiiU.zip');
});

// Sends the official NX release build Zip
server.get('/NX-Release', (req, res) => {
    var file = `${__dirname}/web/assets/ModFiles/NX/relics_of_the_past_v103_switch_.zip`
    res.download(file, 'RelicsOfThePast_Official-Release-NX.zip')
});

// Sends the public WiiU Beta Zip
server.get('/WiiU-Beta_public', (req, res) => {
    var file = `${__dirname}/web/assets/ModFiles/WiiU`
    res.download(file, 'RelicsOfThePast_Public-Beta-WiiU.zip')
});

// Sends the public NX Beta Zip
server.get('/NX-Beta_public', (req, res) => {
    var file = `${__dirname}/web/assets/ModFiles/NX`
    res.download(file, 'RelicsOfThePast_Public-Beta-NX.zip')
});


// Sends the user to the hidden place
server.get('/AFE1278D54216B3D64FA0404A15928D148E86F5585CA7018D24867EAFB9C8F4A', (req, res) => {
    console.log(__dirname)
    res.sendFile(`${__dirname}/web/assets/ModFiles/NX/hidden.html`)
});

// Starts the server
server.listen(port, () => {
    console.log(`Server started on port ${port}`)
});