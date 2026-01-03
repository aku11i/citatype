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
};

export type TypingSessionData = {
  pack: SentencePack;
  messages: TypingSessionMessages;
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

  private get messages(): TypingSessionMessages {
    if (!this.dataState) {
      throw new Error("TypingSession: data is required");
    }
    return this.dataState.messages;
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
      this.setStatus("");
      this.updateView();
    } else {
      this.setStatus(this.messages.statusMissed);
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
    if (!data) {
      throw new Error("TypingSession: data is required");
    }

    if (!this.input) {
      render(
        <div class="space-y-8">
          <div class="rounded-[20px] bg-bg-surface p-8">
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-text-secondary">
              {this.messages.sentenceLabel} <span data-role="index">1 / --</span>
            </p>
            <p class="mt-4 text-[20px] font-semibold text-text-primary" data-role="sentence">
              ...
            </p>
            <p class="mt-4 text-sm font-medium">
              <span class="text-accent-primary" data-role="typed"></span>
              <span class="text-text-secondary" data-role="remaining"></span>
            </p>
          </div>

          <div class="space-y-4">
            <label class="text-base font-medium text-text-secondary" for="typing-input">
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
              class="w-full rounded-2xl bg-bg-disabled px-4 py-4 text-base text-text-primary outline-none transition placeholder:text-text-secondary focus-visible:ring-2 focus-visible:ring-accent-muted"
              placeholder={this.messages.placeholder}
              data-role="input"
            />
            <p class="text-sm text-text-secondary">{this.messages.helper}</p>
          </div>

          <p
            class="inline-flex items-center rounded-full bg-accent-primary px-4 py-1 text-sm font-semibold text-text-inverse"
            data-role="status"
            hidden
          ></p>
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
      const pack = data.pack;

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
      this.setStatus(this.messages.statusComplete);
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

    this.setStatus(this.messages.statusRedirect);

    const form = this.closest("form");
    if (form) {
      form.requestSubmit();
    }
  }

  private setStatus(message: string) {
    if (!this.status) return;
    this.status.textContent = message;
    this.status.hidden = message.length === 0;
  }
}

if (!customElements.get("typing-session")) {
  customElements.define("typing-session", TypingSession);
}

export { TypingSession };
