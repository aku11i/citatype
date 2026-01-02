import { render } from "hono/jsx/dom";
import {
  Session,
  Sentence,
  createEnglishSentenceDefinition,
  createJapaneseSentenceDefinition,
} from "typengine";
import type { SentencePack } from "../../domain/sentences/parse-sentence-pack.js";

export type TypingSessionMessages = {
  sentenceLabel: string;
  typeHereLabel: string;
  placeholder: string;
  helper: string;
  statusMissed: string;
  statusComplete: string;
  statusRedirect: string;
  statusUnavailable: string;
};

export type TypingSessionData = {
  pack: SentencePack;
  messages: TypingSessionMessages;
};

const DEFAULT_MESSAGES: TypingSessionMessages = {
  sentenceLabel: "Sentence",
  typeHereLabel: "Type here",
  placeholder: "Start typing...",
  helper: "Type exactly as shown. Backspace is not supported.",
  statusMissed: "Missed key. Keep going.",
  statusComplete: "Session complete.",
  statusRedirect: "Session complete. Redirecting to result...",
  statusUnavailable: "No sentences available.",
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
  private messages: TypingSessionMessages = DEFAULT_MESSAGES;
  private dataState: TypingSessionData | null = null;

  constructor() {
    super();

    const preUpgrade = (this as unknown as { data?: TypingSessionData }).data;
    if (preUpgrade) {
      delete (this as unknown as { data?: TypingSessionData }).data;
      this.dataState = preUpgrade;
    }
  }

  get data() {
    return this.dataState;
  }

  set data(value: TypingSessionData | null) {
    this.dataState = value;
    if (this.isConnected && !this.session) {
      this.initialize();
    }
  }

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
      this.status.textContent = this.messages.statusMissed;
    }

    if (this.session.completed) this.finishSession();
  };

  connectedCallback() {
    this.initialize();
    this.input?.addEventListener("keydown", this.handleKeyDown);
    this.input?.focus();
  }

  disconnectedCallback() {
    this.input?.removeEventListener("keydown", this.handleKeyDown);
  }

  private initialize() {
    const data = this.dataState;
    this.messages = data?.messages ?? DEFAULT_MESSAGES;

    if (!this.input) {
      render(
        <div class="space-y-5">
          <div class="rounded-2xl border border-secondary-400/50 bg-secondary-200/70 p-5 shadow-sm backdrop-blur-md">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-400">
              {this.messages.sentenceLabel} <span data-role="index">1 / --</span>
            </p>
            <p class="mt-3 text-lg font-semibold text-secondary-900" data-role="sentence">
              ...
            </p>
            <p class="mt-3 text-sm font-medium">
              <span class="text-secondary-900" data-role="typed"></span>
              <span class="text-secondary-400" data-role="remaining"></span>
            </p>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-secondary-700" for="typing-input">
              {this.messages.typeHereLabel}
            </label>
            <input
              id="typing-input"
              type="text"
              inputmode="text"
              autocomplete="off"
              autocapitalize="off"
              autocorrect="off"
              spellcheck={false}
              class="w-full rounded-xl border border-secondary-400/60 bg-secondary-100/70 px-4 py-3 text-sm text-secondary-900 shadow-sm outline-none transition placeholder:text-secondary-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/30"
              placeholder={this.messages.placeholder}
              data-role="input"
            />
            <p class="text-xs text-secondary-500">{this.messages.helper}</p>
          </div>

          <p class="text-xs text-secondary-500" data-role="status"></p>
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
      const pack = data?.pack;
      if (!pack) {
        throw new Error("TypingSession: pack is required");
      }

      const sentenceInstances =
        pack.language === "ja"
          ? pack.sentences.map(
              (entry) => new Sentence(createJapaneseSentenceDefinition(entry.text, entry.reading)),
            )
          : pack.sentences.map(
              (entry) => new Sentence(createEnglishSentenceDefinition(entry.text)),
            );

      if (sentenceInstances.length === 0) {
        throw new Error("TypingSession: sentences are required");
      }

      this.session = new Session(sentenceInstances, {
        onSessionCompleted: () => this.finishSession(),
      });
      this.session.start();
      this.updateView();
    }
  }

  private updateView() {
    if (!this.session) return;

    const sentence = this.session.currentSentence;
    if (!sentence) {
      if (this.status) this.status.textContent = this.messages.statusComplete;
      return;
    }

    if (this.sentenceText) {
      this.sentenceText.textContent = sentence.text;
    }

    const typed = sentence.typed;
    const preview = sentence.previewPattern;
    const remaining = preview.slice(typed.length);

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
      this.status.textContent = this.messages.statusRedirect;
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
