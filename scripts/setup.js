// Imports
var serialPort = require("serialport");

// Configuration
var serialConfig = {
    portname : "/dev/tty.usbserial-FTF3JIXX",
    baudrate : "9600"
};

// Commands pool
var commandsPool = [
    'AT+NAMEagroguia',
    'AT+PIN0000',
    'AT+BAUD3'
];

// Custom parser for OK responses
function parser_atok() {

    var data = '';
    return function (emitter, buffer) {
      data += buffer.toString('utf8');
      //console.log('log data: ', data);
      if (data.indexOf('OK') > -1) {
        emitter.emit('data', 'OK');
        data = '';
      }
    };
};

// Create serial instance
var serial = new serialPort.SerialPort(serialConfig.portname, {
    baudrate: serialConfig.baudrate,
    parser: parser_atok()
});

// Event on data parsing (just OK)
serial.on('data', function(data) {

  console.log('OK');
  if (commandsPool.length > 0) {
    var command = commandsPool.shift();
    console.log('--> sending command: '+command);
    serial.write(command);
  }
  else {
    serial.close();
  }

});

// On port close just exit
serial.on('close', function(data) {
  console.log('------');
  console.log('Configuration done!');
  console.log('------');
  process.exit(0);
});

// Open and send first 'AT'
serial.open(function (error) {
  if ( error ) console.log('failed to open: '+error);
  else serial.write('AT');
});


