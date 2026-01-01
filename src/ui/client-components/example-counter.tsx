import { render } from "hono/jsx/dom";

class ExampleCounter extends HTMLElement {
  private count = 0;
  private button: HTMLButtonElement | null = null;
  private value: HTMLElement | null = null;

  private handleClick = () => {
    this.count += 1;
    this.update();
  };

  connectedCallback() {
    if (!this.button) {
      render(
        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Counter</p>
              <p class="mt-2 text-3xl font-semibold text-slate-900" data-role="value">
                0
              </p>
            </div>
            <button
              type="button"
              class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              data-role="increment"
            >
              +1
            </button>
          </div>
        </div>,
        this,
      );

      this.button = this.querySelector('[data-role="increment"]');
      this.value = this.querySelector('[data-role="value"]');
    }

    this.button?.addEventListener("click", this.handleClick);
    this.update();
  }

  disconnectedCallback() {
    this.button?.removeEventListener("click", this.handleClick);
  }

  private update() {
    if (this.value) {
      this.value.textContent = String(this.count);
    }
  }
}

if (!customElements.get("example-counter")) {
  customElements.define("example-counter", ExampleCounter);
}

export { ExampleCounter };
