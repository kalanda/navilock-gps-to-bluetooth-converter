#! /usr/local/bin/node

// Imports
var serialPort = require("serialport");

// Configuration
var serialConfig = {
    portname : "/dev/tty.usbserial-FTF3JIXX",
    baudrate : "4800",
    parser : serialPort.parsers.raw
};

// Create serial instance
var serial = new serialPort.SerialPort(serialConfig.portname, {
    baudrate: serialConfig.baudrate,
    parser: serialConfig.parser
});

// Event on data parsing (just OK)
serial.on('data', function(data) {
  console.log('Result: ' + data);
  serial.close();
});

// On port close just exit
serial.on('close', function(data) {
  process.exit(0);
});

// Open and send first 'AT'
serial.open(function (error) {
  if ( error ) console.log('failed to open: '+error);
  else serial.write('AT');
});


