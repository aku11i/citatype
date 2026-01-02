import { render } from "hono/jsx/dom";
import {
  Session,
  Sentence,
  createEnglishSentenceDefinition,
  createJapaneseSentenceDefinition,
} from "typengine";

type SentencePayload = {
  text: string;
  reading?: string;
};

type TypingSessionCopy = {
  sentenceLabel: string;
  typeHereLabel: string;
  placeholder: string;
  helper: string;
  statusMissed: string;
  statusComplete: string;
  statusRedirect: string;
};

const DEFAULT_SENTENCES: SentencePayload[] = [
  { text: "citatype is a simple typing app" },
  { text: "type three sentences to finish" },
  { text: "stay calm and keep typing" },
];

const DEFAULT_COPY: TypingSessionCopy = {
  sentenceLabel: "Sentence",
  typeHereLabel: "Type here",
  placeholder: "Start typing...",
  helper: "Type exactly as shown. Backspace is not supported.",
  statusMissed: "Missed key. Keep going.",
  statusComplete: "Session complete.",
  statusRedirect: "Session complete. Redirecting to result...",
};

const parseSentences = (value: string | null): SentencePayload[] => {
  if (!value) return DEFAULT_SENTENCES;

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      const mapped = parsed
        .filter((item) => item && typeof item === "object" && "text" in item)
        .map((item) => ({
          text: String((item as { text: unknown }).text),
          reading:
            "reading" in (item as { reading?: unknown })
              ? String((item as { reading?: unknown }).reading)
              : undefined,
        }));
      return mapped.length > 0 ? mapped : DEFAULT_SENTENCES;
    }
  } catch {
    return DEFAULT_SENTENCES;
  }

  return DEFAULT_SENTENCES;
};

class TypingSession extends HTMLElement {
  private session: Session | null = null;
  private input: HTMLInputElement | null = null;
  private sentenceText: HTMLElement | null = null;
  private sentenceProgress: HTMLElement | null = null;
  private sentenceRemaining: HTMLElement | null = null;
  private sentenceIndex: HTMLElement | null = null;
  private status: HTMLElement | null = null;
  private finished = false;
  private copy: TypingSessionCopy = DEFAULT_COPY;

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.session || this.session.completed) return;

    if (event.key === "Enter") {
      event.preventDefault();
      return;
    }

    if (event.key.length !== 1) return;

    event.preventDefault();

    const value = event.key.toLowerCase();
    const result = this.session.input(value);
    if (result.accepted) {
      if (this.status) this.status.textContent = "";
      this.updateView();
    } else if (this.status) {
      this.status.textContent = this.copy.statusMissed;
    }

    if (this.session.completed) this.finishSession();
  };

  connectedCallback() {
    this.copy = {
      sentenceLabel: this.getAttribute("data-label-sentence") ?? DEFAULT_COPY.sentenceLabel,
      typeHereLabel: this.getAttribute("data-label-type-here") ?? DEFAULT_COPY.typeHereLabel,
      placeholder: this.getAttribute("data-placeholder") ?? DEFAULT_COPY.placeholder,
      helper: this.getAttribute("data-helper") ?? DEFAULT_COPY.helper,
      statusMissed: this.getAttribute("data-status-missed") ?? DEFAULT_COPY.statusMissed,
      statusComplete: this.getAttribute("data-status-complete") ?? DEFAULT_COPY.statusComplete,
      statusRedirect: this.getAttribute("data-status-redirect") ?? DEFAULT_COPY.statusRedirect,
    };

    if (!this.input) {
      render(
        <div class="space-y-5">
          <div class="rounded-2xl border border-secondary-400/50 bg-secondary-200/70 p-5 shadow-sm backdrop-blur-md dark:border-secondary-700/60 dark:bg-secondary-800/70">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-400 dark:text-secondary-300">
              {this.copy.sentenceLabel} <span data-role="index">1 / 3</span>
            </p>
            <p
              class="mt-3 text-lg font-semibold text-secondary-900 dark:text-secondary-100"
              data-role="sentence"
            >
              ...
            </p>
            <p class="mt-3 text-sm font-medium">
              <span class="text-secondary-900 dark:text-secondary-100" data-role="typed"></span>
              <span class="text-secondary-400 dark:text-secondary-400" data-role="remaining"></span>
            </p>
          </div>

          <div class="space-y-2">
            <label
              class="text-sm font-medium text-secondary-700 dark:text-secondary-300"
              for="typing-input"
            >
              {this.copy.typeHereLabel}
            </label>
            <input
              id="typing-input"
              type="text"
              inputmode="text"
              autocomplete="off"
              autocapitalize="off"
              autocorrect="off"
              spellcheck={false}
              class="w-full rounded-xl border border-secondary-400/60 bg-secondary-100/70 px-4 py-3 text-sm text-secondary-900 shadow-sm outline-none transition placeholder:text-secondary-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/30 dark:border-secondary-700/60 dark:bg-secondary-900/60 dark:text-secondary-100 dark:placeholder:text-secondary-500 dark:focus:border-primary-400 dark:focus:ring-primary-500/40"
              placeholder={this.copy.placeholder}
              data-role="input"
            />
            <p class="text-xs text-secondary-500">{this.copy.helper}</p>
          </div>

          <p class="text-xs text-secondary-500 dark:text-secondary-400" data-role="status"></p>
        </div>,
        this,
      );

      this.input = this.querySelector('[data-role="input"]');
      this.sentenceText = this.querySelector('[data-role="sentence"]');
      this.sentenceProgress = this.querySelector('[data-role="typed"]');
      this.sentenceRemaining = this.querySelector('[data-role="remaining"]');
      this.sentenceIndex = this.querySelector('[data-role="index"]');
      this.status = this.querySelector('[data-role="status"]');
    }

    if (!this.session) {
      const locale = this.getAttribute("data-locale") ?? "en";
      const sentences = parseSentences(this.getAttribute("data-sentences"));
      const sentenceInstances = sentences.map((sentence) => {
        if (locale === "ja") {
          const reading = sentence.reading ?? sentence.text;
          return new Sentence(createJapaneseSentenceDefinition(sentence.text, reading));
        }
        const reading = sentence.reading ?? sentence.text;
        return new Sentence(createEnglishSentenceDefinition(sentence.text, reading));
      });

      this.session = new Session(sentenceInstances, {
        onSessionCompleted: () => this.finishSession(),
      });
      this.session.start();
      this.updateView();
    }

    this.input?.addEventListener("keydown", this.handleKeyDown);
    this.input?.focus();
  }

  disconnectedCallback() {
    this.input?.removeEventListener("keydown", this.handleKeyDown);
  }

  private updateView() {
    if (!this.session) return;

    const sentence = this.session.currentSentence;
    if (!sentence) {
      if (this.status) this.status.textContent = this.copy.statusComplete;
      return;
    }

    if (this.sentenceText) {
      this.sentenceText.textContent = sentence.text;
    }

    const typed = sentence.typed;
    const reading = sentence.reading;
    const remaining = reading.slice(typed.length);

    if (this.sentenceProgress) {
      this.sentenceProgress.textContent = typed;
    }

    if (this.sentenceRemaining) {
      this.sentenceRemaining.textContent = remaining;
    }

    if (this.sentenceIndex) {
      const total = this.session.sentences.length;
      const current = Math.min(this.session.position + 1, total);
      this.sentenceIndex.textContent = `${current} / ${total}`;
    }
  }

  private finishSession() {
    if (this.finished) return;
    this.finished = true;

    if (this.input) {
      this.input.disabled = true;
    }

    if (this.status) {
      this.status.textContent = this.copy.statusRedirect;
    }

    const form = this.closest("form");
    if (form) {
      form.requestSubmit();
    }
  }
}

if (!customElements.get("typing-session")) {
  customElements.define("typing-session", TypingSession);
}

export { TypingSession };
