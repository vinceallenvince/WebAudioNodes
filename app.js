var connect = require('connect'),
    fs = require('fs'),
    io = require('socket.io').listen(1337),
    EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

// serve html from /public
connect(connect.static(__dirname + '/public')).listen(8000);

io.sockets.on('connection', function(socket) {

  emitter.on('powerButton', function() {
    socket.emit('powerButton');
  });

  emitter.on('potGain', function(data) {
    socket.emit('potGain', data);
  });

  emitter.on('potOscA', function(data) {
    socket.emit('potOscA', data);
  });

  emitter.on('potOscB', function(data) {
    socket.emit('potOscB', data);
  });
});

// connect to potentiometer via Johnny-five
var five = require("johnny-five"),
  board, powerButton, potOscA, potOscB;

var powerButtonPin = 8,
    potGainPin = "A0",
    potOscAPin = "A2",
    potOscBPin = "A4";

board = new five.Board();

board.on("ready", function() {

  // POWER BUTTON
  powerButton = new five.Button(powerButtonPin);

  // Button Events
  powerButton.on("up", function() {
    emitter.emit('powerButton');
  });


  // Gain POTENTIOMETER
  potGain = new five.Sensor({
    pin: potGainPin,
    freq: 10
  });

  // potentiometer events
  potGain.on("data", function() {
    emitter.emit('potGain', this.value);
  });


  // OscillatorA POTENTIOMETER
  potOscA = new five.Sensor({
    pin: potOscAPin,
    freq: 10
  });

  // potentiometer events
  potOscA.on("data", function() {
    emitter.emit('potOscA', this.value);
  });


  // OscillatorB POTENTIOMETER
  potOscB = new five.Sensor({
    pin: potOscBPin,
    freq: 10
  });

  // potentiometer events
  potOscB.on("data", function() {
    emitter.emit('potOscB', this.value);
  });

});
