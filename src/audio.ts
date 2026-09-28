import * as Tone from "tone";

let synth: Tone.PolySynth | null = null;

// Created on first use: browsers only allow audio after a user gesture.
const getSynth = () => {
  synth ??= new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "triangle" },
    envelope: { attack: 0.005, decay: 0.3, sustain: 0.2, release: 1 },
  }).toDestination();
  return synth;
};

export const startAudio = () => Tone.start();

export const playNote = async (note: string) => {
  await startAudio();
  getSynth().triggerAttackRelease(note, "8n");
};
