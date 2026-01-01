import { render } from 'hono/jsx/dom'
import { Session, Sentence, createEnglishSentenceDefinition } from 'typengine'

const SENTENCES = [
  'dakenmania is a simple typing app',
  'type three sentences to finish',
  'stay calm and keep typing',
]

class TypingSession extends HTMLElement {
  private session: Session | null = null
  private input: HTMLInputElement | null = null
  private sentenceText: HTMLElement | null = null
  private sentenceProgress: HTMLElement | null = null
  private sentenceRemaining: HTMLElement | null = null
  private sentenceIndex: HTMLElement | null = null
  private status: HTMLElement | null = null
  private finished = false

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.session || this.session.completed) return

    if (event.key === 'Enter') {
      event.preventDefault()
      return
    }

    if (event.key.length !== 1) return

    event.preventDefault()

    const value = event.key.toLowerCase()
    const result = this.session.input(value)
    if (result.accepted) {
      if (this.status) this.status.textContent = ''
      this.updateView()
    } else if (this.status) {
      this.status.textContent = 'Missed key. Keep going.'
    }

    if (this.session.completed) this.finishSession()
  }

  connectedCallback() {
    if (!this.input) {
      render(
        <div class="space-y-5">
          <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Sentence <span data-role="index">1 / 3</span>
            </p>
            <p
              class="mt-3 text-lg font-semibold text-slate-900"
              data-role="sentence"
            >
              ...
            </p>
            <p class="mt-3 text-sm font-medium">
              <span class="text-slate-900" data-role="typed"></span>
              <span class="text-slate-400" data-role="remaining"></span>
            </p>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700" for="typing-input">
              Type here
            </label>
            <input
              id="typing-input"
              type="text"
              inputmode="text"
              autocomplete="off"
              autocapitalize="off"
              autocorrect="off"
              spellcheck={false}
              class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              placeholder="Start typing..."
              data-role="input"
            />
            <p class="text-xs text-slate-500">
              Type exactly as shown. Backspace is not supported.
            </p>
          </div>

          <p class="text-xs text-slate-500" data-role="status"></p>
        </div>,
        this
      )

      this.input = this.querySelector('[data-role="input"]')
      this.sentenceText = this.querySelector('[data-role="sentence"]')
      this.sentenceProgress = this.querySelector('[data-role="typed"]')
      this.sentenceRemaining = this.querySelector('[data-role="remaining"]')
      this.sentenceIndex = this.querySelector('[data-role="index"]')
      this.status = this.querySelector('[data-role="status"]')
    }

    if (!this.session) {
      const sentences = SENTENCES.map(
        (text) => new Sentence(createEnglishSentenceDefinition(text))
      )
      this.session = new Session(sentences, {
        onSessionCompleted: () => this.finishSession(),
      })
      this.session.start()
      this.updateView()
    }

    this.input?.addEventListener('keydown', this.handleKeyDown)
    this.input?.focus()
  }

  disconnectedCallback() {
    this.input?.removeEventListener('keydown', this.handleKeyDown)
  }

  private updateView() {
    if (!this.session) return

    const sentence = this.session.currentSentence
    if (!sentence) {
      if (this.status) this.status.textContent = 'Session complete.'
      return
    }

    if (this.sentenceText) {
      this.sentenceText.textContent = sentence.text
    }

    const typed = sentence.typed
    const reading = sentence.reading
    const remaining = reading.slice(typed.length)

    if (this.sentenceProgress) {
      this.sentenceProgress.textContent = typed
    }

    if (this.sentenceRemaining) {
      this.sentenceRemaining.textContent = remaining
    }

    if (this.sentenceIndex) {
      const total = this.session.sentences.length
      const current = Math.min(this.session.position + 1, total)
      this.sentenceIndex.textContent = `${current} / ${total}`
    }
  }

  private finishSession() {
    if (this.finished) return
    this.finished = true

    if (this.input) {
      this.input.disabled = true
    }

    if (this.status) {
      this.status.textContent = 'Session complete. Redirecting to result...'
    }

    const form = this.closest('form')
    if (form) {
      form.requestSubmit()
    }
  }
}

if (!customElements.get('typing-session')) {
  customElements.define('typing-session', TypingSession)
}

export { TypingSession }
