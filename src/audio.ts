import * as Tone from "tone";

let synth: Tone.PolySynth | null = null;

const getSynth = () => {
  if (!synth) {
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.005, decay: 0.3, sustain: 0.2, release: 1 },
    }).toDestination();
  }
  return synth;
};

export const startAudio = () => Tone.start();

export const playNote = async (note: string) => {
  try {
    await startAudio();
    getSynth().triggerAttackRelease(note, "8n");
  } catch (error) {
    console.error("Unable to play note:", error);
  }
};
