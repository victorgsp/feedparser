var express = require('express');
const https = require('https');
var parser = require('xml2json');
var xml = require('xml');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/parsed-feed', async function (req, res, next) {
  
  https.get('https://www.spreaker.com/show/2087315/episodes/feed', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {

      // chunk = (""+ chunk).replace("&","");
      //res.set('Content-Type', 'text/xml');
      
      let xmlValue = `<?xml version="1.0" encoding="UTF-8"?>
      <note>
        <to>Tove</to>
        <from>Jani</from>
        <heading>Reminder</heading>
        <body>Don't forget me this weekend!</body>
      </note>`;
      
      //res.type('application/xml');
      res.send(xmlValue);
      res.json({ title: 'Express' });
      // res.send(xml(chunk+""));
      //console.log("==================>",chunk+"");
      //var json = JSON.parse(parser.toJson(chunk, {reversible: true}));

      //data = json;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(data);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
  res.json({ title: 'Express' });
});

module.exports = router;
