// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const port = process.env.PORT || 5500;


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  res.send(exit(req.params.date));
});

//function to determine if the format is unix
const format = dateImput => {
  if(/\W/g.test(dateImput)) {
    return false;
  }
  return true;
}

const exit = value => {
  if(value === undefined) {
    return {
      unix: new Date().getTime(), 
      utc: new Date().toUTCString()
    }
  } else if(format(value)) {
      if(String(new Date(Number(value))) === "Invalid Date") {
        return {error: "Invalid Date"}
      } else {
          return {
            unix: new Date(Number(value)).getTime(),
            utc: new Date(Number(value)).toUTCString()
          }
        }  
  } else if(String(new Date(value)) === "Invalid Date") {
      return {
        error: "Invalid Date"
      }
    } else {
        return {
          unix: new Date(value).getTime(),
          utc: new Date(value).toUTCString()
        }
      }
}

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});