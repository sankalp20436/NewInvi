/**
 * Gentle synthesized Indian classical wedding ambiance (tanpura drone + pentatonic santoor chimes)
 * using Web Audio API with zero external network dependencies.
 */
class RoyalAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private melodyTimer: number | null = null;
  private isPlaying = false;
  private step = 0;

  // Raga Bhupali / Yaman warm pentatonic scale frequencies (C4 major pentatonic / Sa Re Ga Pa Dha)
  private readonly notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 440.0, 392.0, 329.63, 293.66];

  public start(): boolean {
    if (this.isPlaying) return true;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }

      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.001, this.ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.16, this.ctx.currentTime + 1.4);
      master.connect(this.ctx.destination);
      this.masterGain = master;

      // Soft Tanpura drone (Sa = 130.81Hz, Pa = 196.00Hz)
      const droneFreqs = [130.81, 196.0, 261.63];
      this.droneOscs = droneFreqs.map((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = idx === 1 ? 'triangle' : 'sine';
        osc.frequency.value = freq;
        g.gain.value = idx === 0 ? 0.14 : 0.06;
        osc.connect(g);
        g.connect(master);
        osc.start();
        return osc;
      });

      this.isPlaying = true;
      this.scheduleNextNote();
      return true;
    } catch {
      return false;
    }
  }

  private scheduleNextNote() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    const freq = this.notes[this.step % this.notes.length];
    this.step += 1;
    this.pluckSantoor(freq);
    const delayMs = this.step % 4 === 0 ? 1350 : 880;
    this.melodyTimer = window.setTimeout(() => this.scheduleNextNote(), delayMs);
  }

  private pluckSantoor(freq: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const overtone = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2, now);

    const overGain = this.ctx.createGain();
    overGain.gain.setValueAtTime(0.08, now);
    overGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    osc.connect(gain);
    overtone.connect(overGain);
    overGain.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + 2.3);
    overtone.stop(now + 2.3);
  }

  public stop() {
    this.isPlaying = false;
    if (this.melodyTimer !== null) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(0.0001, now, 0.2);
    }
    const oldOscs = this.droneOscs;
    this.droneOscs = [];
    setTimeout(() => {
      oldOscs.forEach((o) => {
        try {
          o.stop();
          o.disconnect();
        } catch {
          // ignore already stopped
        }
      });
    }, 350);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    }
    return this.start();
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const royalAudio = new RoyalAudioEngine();
