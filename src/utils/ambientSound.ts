/**
 * Royalty-free, zero-dependency procedural Web Audio ambient generator.
 * Synthesizes a very quiet, warm evening room tone and distant soft wind across rooftops,
 * plus optional gentle rain patter when rain is enabled.
 * Strictly disabled by default and requires explicit user interaction.
 */

class AmbientAudioController {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private windGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private isRunning = false;
  private song: HTMLAudioElement | null = null;

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    return Boolean(AudioCtx);
  }

  public start(withRain: boolean): { ok: boolean; error?: string } {
    if (!this.isSupported()) {
      return { ok: false, error: 'Web Audio API is not supported in this browser.' };
    }

    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        // Create 3-second brown/pinkish noise buffer for gentle rooftop air & room tone
        const bufferSize = this.ctx.sampleRate * 3;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 2.4;
        }

        // Distant evening wind / room hush
        const windSource = this.ctx.createBufferSource();
        windSource.buffer = noiseBuffer;
        windSource.loop = true;

        const windFilter = this.ctx.createBiquadFilter();
        windFilter.type = 'lowpass';
        windFilter.frequency.setValueAtTime(240, this.ctx.currentTime);

        this.windGain = this.ctx.createGain();
        this.windGain.gain.setValueAtTime(0.16, this.ctx.currentTime);

        windSource.connect(windFilter);
        windFilter.connect(this.windGain);
        this.windGain.connect(this.masterGain);
        windSource.start(0);

        // Subtle warm low harmonic chord (very faint, atmospheric)
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(110, this.ctx.currentTime); // A2
        osc2.frequency.setValueAtTime(164.81, this.ctx.currentTime); // E3

        const padGain = this.ctx.createGain();
        padGain.gain.setValueAtTime(0.018, this.ctx.currentTime);

        osc1.connect(padGain);
        osc2.connect(padGain);
        padGain.connect(this.masterGain);
        osc1.start(0);
        osc2.start(0);

        // Soft rain layer on window glass (white/pink filtered noise)
        const rainBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const rainData = rainBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          rainData[i] = (Math.random() * 2 - 1) * 0.45;
        }

        const rainSource = this.ctx.createBufferSource();
        rainSource.buffer = rainBuffer;
        rainSource.loop = true;

        const rainFilter = this.ctx.createBiquadFilter();
        rainFilter.type = 'bandpass';
        rainFilter.frequency.setValueAtTime(1150, this.ctx.currentTime);
        rainFilter.Q.setValueAtTime(0.7, this.ctx.currentTime);

        this.rainGain = this.ctx.createGain();
        this.rainGain.gain.setValueAtTime(withRain ? 0.045 : 0.0, this.ctx.currentTime);

        rainSource.connect(rainFilter);
        rainFilter.connect(this.rainGain);
        this.rainGain.connect(this.masterGain);
        rainSource.start(0);
      }

      if (this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }

      if (this.masterGain && this.ctx) {
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.setTargetAtTime(0.85, this.ctx.currentTime, 0.8);
      }

      if (!this.song) {
        this.song = new Audio(`${import.meta.env.BASE_URL}music/song.mp3`);
        this.song.loop = true;
        this.song.volume = 0.5;
      }
      void this.song.play().catch(() => {});

      this.setRainLayer(withRain);
      this.isRunning = true;
      return { ok: true };
    } catch {
      return { ok: false, error: 'Audio playback was prevented by browser settings.' };
    }
  }

  public setRainLayer(enabled: boolean): void {
    if (!this.ctx || !this.rainGain) return;
    const target = enabled && this.isRunning ? 0.045 : 0.0;
    this.rainGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.rainGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.6);
  }

  public stop(): void {
    this.song?.pause();
    if (!this.ctx || !this.masterGain) {
      this.isRunning = false;
      return;
    }
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.35);
    this.isRunning = false;
  }

  public dispose(): void {
    this.song?.pause();
    this.song = null;
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
      this.masterGain = null;
      this.windGain = null;
      this.rainGain = null;
      this.isRunning = false;
    }
  }
}

export const ambientAudio = new AmbientAudioController();
