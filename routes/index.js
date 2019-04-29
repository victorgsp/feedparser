var express = require('express');
const https = require('https');
var parser = require('xml2json');
var xml = require('xml');
const axios = require("axios");

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/parsed-feed', async function (req, res, next) {
  
  let url = 'https://www.spreaker.com/show/2087315/episodes/feed';
  //http://www.spreaker.com/show/2087315/episodes/feed

  const getData = async url => {
    try {
      const response = await axios.get(url);
      const data = response.data + "";
      // console.log(data);

      var json = JSON.parse(parser.toJson(data, {reversible: true}));
      var xml = parser.toXml(JSON.stringify(json));
      //console.log("==================>",xml[0]+xml[1]+xml[2]+xml[3]+xml[4]);
      xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + xml;
      console.log("==================>",xml.substr(0,100));
      res.type('application/xml');
      //res.send("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + xml);
      res.send(data.replace("</guid>","0</guid>"));

      res.json(json);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };
  
  getData(url);
});

module.exports = router;
