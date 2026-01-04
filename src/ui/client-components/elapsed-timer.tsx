const formatElapsed = (elapsedMs: number) => {
  const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const paddedSeconds = String(seconds).padStart(2, "0");

  if (hours > 0) {
    const paddedMinutes = String(minutes).padStart(2, "0");
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }

  return `${minutes}:${paddedSeconds}`;
};

class ElapsedTimer extends HTMLElement {
  private startedAt = 0;
  private intervalId: number | null = null;

  connectedCallback() {
    const raw = this.getAttribute("data-started-at");
    const startedAt = raw ? Number(raw) : Number.NaN;

    if (!Number.isFinite(startedAt)) {
      this.textContent = "--:--";
      return;
    }

    this.startedAt = startedAt;
    this.updateTime();
    this.intervalId = window.setInterval(() => this.updateTime(), 1000);
  }

  disconnectedCallback() {
    if (this.intervalId === null) return;
    window.clearInterval(this.intervalId);
    this.intervalId = null;
  }

  private updateTime() {
    this.textContent = formatElapsed(Date.now() - this.startedAt);
  }
}

if (!customElements.get("elapsed-timer")) {
  customElements.define("elapsed-timer", ElapsedTimer);
}

export { ElapsedTimer };
