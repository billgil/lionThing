import { LitElement, html, css } from "lit-element"
import '../timer/timer.component.js'
import '@lion/input/lion-input.js'
import '../button/button.component.js'

class TimerMaker extends LitElement {
  static get properties() {
		return {
			timerTitle: { type: String },
      secondsToCount: { type: Number },
      activeTimers: { type: Array },
      timerIdGen : { type: Number }
		}
	}

	constructor() {
    super()
    this.timerTitle = ''
    this.secondsToCount = 0
    this.timerIdGen = 0
    this.activeTimers = []
  }
  
  static get styles() {
    return css`
      :host {
        display: block;
      }

      .timer-maker {
        align-items: center;
        display: flex;
        justify-content: space-around;
        margin: 0 auto;
        max-width: 720px;
        padding: 50px 20px;
        width: 100%;
      }

      .timer-maker__input {
        margin-bottom: 0;
        max-width: 200px;
      }

      .timer-maker__button .btn {
        background-color: #3398db;
      }

      .timers {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
      }
    `
  }

  render() {
    return html`
      <div class="timer-maker">
        <lion-input class="timer-maker__input" @keyup=${this.titleUpdated} placeholder="Timer Name" name="timer-title" type="text"></lion-input>
        <lion-input class="timer-maker__input" @keyup=${this.secondsUpdated} placeholder="Amount of seconds" name="timer-count-seconds" type="number"></lion-input>
        <timer-button @click=${this.createNewTimer}>Start Timer</timer-button>
      </div>

      <div class="timers">
        ${this.activeTimers.map(
          (timer) => html`
            <timer-item @timer-deleted=${this.removeTimer} .timerID="${timer.id}" .timerTitle="${timer.title}" .secondsToCount="${timer.seconds}"></timer-item>
          `
        )}
      </div>
    `
  }

  get timerInputs() {
    return this.shadowRoot.querySelectorAll('.timer-maker__input')
  }

  /* eslint no-param-reassign: ["error", { "props": false }] */
  resetInputs() {
    this.timerInputs.forEach(timerInput => {
      timerInput.value = ''
    })
  }

  titleUpdated(event) {
    this.timerTitle = event.target.value
  }

  secondsUpdated(event) {
    this.secondsToCount = event.target.value
  }

  // remove timer is a custom event passed to each timer
  removeTimer(event) {
    // filter all active timers unless the ID matches the ID passed by the event
    this.activeTimers = this.activeTimers.filter((timer) => timer.id !== event.detail)
  }

  createNewTimer() {
    // make a new timer for the active timers array
    const newTimer = {
      title: this.timerTitle,
      seconds: this.secondsToCount,
      id: this.timerIdGen
    }
    // this insures the timers always have a unique ID
    this.timerIdGen += 1
    this.activeTimers = [...this.activeTimers, newTimer]

    // clean title and counter
    this.timerTitle = ''
    this.secondsToCount = 0
    this.resetInputs()
  }
}

customElements.define("timer-maker", TimerMaker)