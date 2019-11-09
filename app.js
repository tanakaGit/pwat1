//WebApi Setting
const express = require('express');
const bodyParser = require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({
  extended:true 
}));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
//app.listen(3000);

console.log("server is online");


var transmit = function (servos) {

  //Sender setting 
  var connectionString = 'HostName=gxa-iothub.azure-devices.net;DeviceId=MyJavaDevice;SharedAccessKey=XbYNp0eu72eHEfROTFWAHJzEvbVspA76sZwwq3ifhsI=';
  var Mqtt = require('azure-iot-device-mqtt').Mqtt;
  var DeviceClient = require('azure-iot-device').Client
  var Message = require('azure-iot-device').Message;
  var client4send = DeviceClient.fromConnectionString(connectionString, Mqtt);

  var message = new Message(JSON.stringify({
    servo: servos
  }));

  console.log('Sending message: ' + message.getData());

  // Send the message.
  client4send.sendEvent(message, function (err) {
    if (err) {
      console.error('send error: ' + err.toString());
    } else {
      console.log('message sent');
    }
  });
};

//request ex) { "servo" : [1,1,1,1,0,0] }
app.post('/api/transmit',function(req,res){

  console.log(req.body);

  console.log(req.body.servo);

  transmit(req.body.servo);
  res.send('post request to here');
});