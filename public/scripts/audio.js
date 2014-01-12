var AudioMods = {}, exports = AudioMods;

(function init(g){
  try {
    AudioMods.audio_context = new (g.AudioContext || g.webkitAudioContext);
  } catch (e) {
    throw new Error('No web audio oscillator support in this browser');
  }
}(window));

AudioMods.configure = function() {
  // function to wire up mods goes here
};

AudioMods.connect = function(nodeA, nodeB) {
  nodeA.connect(nodeB);
};

// GAIN
function Gain(opt_options) {
  var options = opt_options || {};
  this.node = AudioMods.audio_context.createGainNode();
  this.node.gain.value = options.gain === 'undefined' ? 0.1 : options.gain;
}

Gain.prototype.changeGain = function(val) {
  this.node.gain.value = val;
};

exports.Gain = Gain;

// OSCILLATOR
function Oscillator(opt_options) {
  var options = opt_options || {};
  this.isPlaying = false;
}

Oscillator.prototype.play = function() {
  this.osc = AudioMods.audio_context.createOscillator();
  this.osc.type = 'sine';
  this.osc.frequency.value = 400;
  this.osc.start(0);
}

Oscillator.prototype.stop = function() {
  this.osc.stop(0);
}

Oscillator.prototype.toggle = function() {
  (this.isPlaying ? this.stop() : this.play());
  this.isPlaying = !this.isPlaying;
};

Oscillator.prototype.changeFrequency = function(val) {
  this.osc.frequency.value = val;
};

exports.Oscillator = Oscillator;
