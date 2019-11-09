//本nodejsは glitchのconsole画面から node ReadDeviceToCloudMessage.js でバックグラウンド駆動。
//受信タイミングとかがよくわからないな　定期的に受信？し、servoLockの中身をclientへ返却する。
'use strict';

var connectionString = 'HostName=gxa-iothub.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=OyEz2kjpckzI6yomFqxBIfDoXZMilFKfrBf5FIDSB8g=';

var { EventHubClient, EventPosition } = require('@azure/event-hubs');

var printError = function (err) {
  console.log(err.message);
};

var printMessage = function (message) {
  //TODO:受信データ servoLock のmessage.bodyをclientへ返却する。
  console.log('Telemetry received: ');
  console.log(JSON.stringify(message.body));
  console.log('Application properties (set by device): ')
  console.log(JSON.stringify(message.applicationProperties));
  console.log('System properties (set by IoT Hub): ')
  console.log(JSON.stringify(message.annotations));
  console.log('');
};

var ehClient;
EventHubClient.createFromIotHubConnectionString(connectionString).then(function (client) {
  console.log("Successfully created the EventHub Client from iothub connection string.");
  ehClient = client;
  return ehClient.getPartitionIds();
}).then(function (ids) {
  console.log("The partition ids are: ", ids);
  return ids.map(function (id) {
    return ehClient.receive(id, printMessage, printError, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  });
}).catch(printError);
