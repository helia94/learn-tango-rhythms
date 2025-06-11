
export const createAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

export const playSound = (soundType: string, isHalfBeat = false) => {
  console.log(`Playing ${soundType} sound, isHalfBeat: ${isHalfBeat}`);
  const audioContext = createAudioContext();
  const masterGain = audioContext.createGain();
  masterGain.connect(audioContext.destination);
  
  if (soundType === 'bass') {
    playBassSound(audioContext, masterGain);
  } else if (soundType === 'softbass') {
    playSoftBassSound(audioContext, masterGain);
  } else if (soundType === 'dragbeat') {
    playDragBeatSound(audioContext, masterGain);
  }

  masterGain.gain.setValueAtTime(0.8, audioContext.currentTime);
};

const playBassSound = (audioContext: AudioContext, masterGain: GainNode) => {
  const fundamentalFreq = 73.42;
  const duration = 0.5;
  const volumeMultiplier = 1;

  // Main bass oscillator
  const osc1 = audioContext.createOscillator();
  const gain1 = audioContext.createGain();
  const filter1 = audioContext.createBiquadFilter();
  osc1.connect(filter1);
  filter1.connect(gain1);
  gain1.connect(masterGain);
  osc1.frequency.setValueAtTime(fundamentalFreq, audioContext.currentTime);
  osc1.type = 'sawtooth';

  filter1.type = 'lowpass';
  filter1.frequency.setValueAtTime(300, audioContext.currentTime);
  filter1.Q.setValueAtTime(3, audioContext.currentTime);

  // Sub-bass for power
  const osc2 = audioContext.createOscillator();
  const gain2 = audioContext.createGain();
  osc2.connect(gain2);
  gain2.connect(masterGain);
  osc2.frequency.setValueAtTime(fundamentalFreq * 0.5, audioContext.currentTime);
  osc2.type = 'sine';

  // Attack harmonic
  const osc3 = audioContext.createOscillator();
  const gain3 = audioContext.createGain();
  const filter3 = audioContext.createBiquadFilter();
  osc3.connect(filter3);
  filter3.connect(gain3);
  gain3.connect(masterGain);
  osc3.frequency.setValueAtTime(fundamentalFreq * 2, audioContext.currentTime);
  osc3.type = 'square';
  filter3.type = 'bandpass';
  filter3.frequency.setValueAtTime(250, audioContext.currentTime);

  gain1.gain.setValueAtTime(0, audioContext.currentTime);
  gain1.gain.linearRampToValueAtTime(0.6 * volumeMultiplier, audioContext.currentTime + 0.01);
  gain1.gain.exponentialRampToValueAtTime(0.2 * volumeMultiplier, audioContext.currentTime + 0.1);
  gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  gain2.gain.setValueAtTime(0, audioContext.currentTime);
  gain2.gain.linearRampToValueAtTime(0.4 * volumeMultiplier, audioContext.currentTime + 0.02);
  gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  gain3.gain.setValueAtTime(0, audioContext.currentTime);
  gain3.gain.linearRampToValueAtTime(0.3 * volumeMultiplier, audioContext.currentTime + 0.005);
  gain3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

  osc1.start(audioContext.currentTime);
  osc1.stop(audioContext.currentTime + duration);
  osc2.start(audioContext.currentTime);
  osc2.stop(audioContext.currentTime + duration);
  osc3.start(audioContext.currentTime);
  osc3.stop(audioContext.currentTime + 0.1);
};

const playSoftBassSound = (audioContext: AudioContext, masterGain: GainNode) => {
  const fundamentalFreq = 82.41;
  const duration = 0.4;
  const volumeMultiplier = 1.2;

  // Main bass oscillator - using sawtooth for bass character
  const osc1 = audioContext.createOscillator();
  const gain1 = audioContext.createGain();
  const filter1 = audioContext.createBiquadFilter();
  osc1.connect(filter1);
  filter1.connect(gain1);
  gain1.connect(masterGain);
  osc1.frequency.setValueAtTime(fundamentalFreq, audioContext.currentTime);
  osc1.type = 'sawtooth';

  // Sub-bass for deeper bass tone
  const osc2 = audioContext.createOscillator();
  const gain2 = audioContext.createGain();
  osc2.connect(gain2);
  gain2.connect(masterGain);
  osc2.frequency.setValueAtTime(fundamentalFreq * 0.5, audioContext.currentTime);
  osc2.type = 'sine';

  filter1.type = 'lowpass';
  filter1.frequency.setValueAtTime(200, audioContext.currentTime);
  filter1.Q.setValueAtTime(1.5, audioContext.currentTime);

  // Main bass envelope
  gain1.gain.setValueAtTime(0, audioContext.currentTime);
  gain1.gain.linearRampToValueAtTime(0.4 * volumeMultiplier, audioContext.currentTime + 0.02);
  gain1.gain.exponentialRampToValueAtTime(0.25 * volumeMultiplier, audioContext.currentTime + 0.1);
  gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  // Sub-bass envelope
  gain2.gain.setValueAtTime(0, audioContext.currentTime);
  gain2.gain.linearRampToValueAtTime(0.3 * volumeMultiplier, audioContext.currentTime + 0.03);
  gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  osc1.start(audioContext.currentTime);
  osc1.stop(audioContext.currentTime + duration);
  osc2.start(audioContext.currentTime);
  osc2.stop(audioContext.currentTime + duration);
};

const playDragBeatSound = (audioContext: AudioContext, masterGain: GainNode) => {
  const fundamentalFreq = 55.00;
  const duration = 0.8;
  const volumeMultiplier = 1.2;
  const arrestreDelay = -0.05;

  // Main drag oscillator
  const osc1 = audioContext.createOscillator();
  const gain1 = audioContext.createGain();
  const filter1 = audioContext.createBiquadFilter();
  osc1.connect(filter1);
  filter1.connect(gain1);
  gain1.connect(masterGain);
  osc1.frequency.setValueAtTime(fundamentalFreq, audioContext.currentTime);
  osc1.type = 'sawtooth';

  filter1.type = 'lowpass';
  filter1.frequency.setValueAtTime(150, audioContext.currentTime);
  filter1.Q.setValueAtTime(4, audioContext.currentTime);

  // Sub-bass for extra power
  const osc2 = audioContext.createOscillator();
  const gain2 = audioContext.createGain();
  osc2.connect(gain2);
  gain2.connect(masterGain);
  osc2.frequency.setValueAtTime(fundamentalFreq * 0.5, audioContext.currentTime);
  osc2.type = 'sine';

  // Attack noise for the "drag" effect
  const osc3 = audioContext.createOscillator();
  const gain3 = audioContext.createGain();
  const filter3 = audioContext.createBiquadFilter();
  osc3.connect(filter3);
  filter3.connect(gain3);
  gain3.connect(masterGain);
  osc3.frequency.setValueAtTime(fundamentalFreq * 4, audioContext.currentTime);
  osc3.type = 'sawtooth';
  filter3.type = 'bandpass';
  filter3.frequency.setValueAtTime(100, audioContext.currentTime);

  const startTime = Math.max(0, audioContext.currentTime + arrestreDelay);

  gain1.gain.setValueAtTime(0, startTime);
  gain1.gain.linearRampToValueAtTime(0.8 * volumeMultiplier, startTime + 0.02);
  gain1.gain.exponentialRampToValueAtTime(0.3 * volumeMultiplier, startTime + 0.15);
  gain1.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
  
  gain2.gain.setValueAtTime(0, startTime);
  gain2.gain.linearRampToValueAtTime(0.6 * volumeMultiplier, startTime + 0.03);
  gain2.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
  
  gain3.gain.setValueAtTime(0, startTime);
  gain3.gain.linearRampToValueAtTime(0.4 * volumeMultiplier, startTime + 0.01);
  gain3.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

  osc1.start(startTime);
  osc1.stop(startTime + duration);
  osc2.start(startTime);
  osc2.stop(startTime + duration);
  osc3.start(startTime);
  osc3.stop(startTime + 0.2);
};
