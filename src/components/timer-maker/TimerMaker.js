import { LitElement, html, css } from 'lit-element';
import '@lion/form/lion-form.js';
import '../timer/timer-item.js';
import '../button-create/button-create.component.js';
import '../input/timer-input.js';

export class TimerMaker extends LitElement {
  static get properties() {
    return {
      timerTitle: { type: String },
      secondsToCount: { type: Number },
      activeTimers: { type: Array },
      timerIdGen: { type: Number },
    };
  }

  constructor() {
    super();
    this.timerTitle = '';
    this.secondsToCount = 0;
    this.timerIdGen = 0;
    this.activeTimers = [];
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .timer-maker {
        display: block;
        margin: 0 auto;
        max-width: 900px;
        padding: 30px 20px;
        width: 100%;
      }

      timer-input {
        border: none;
        margin: 0 16px 0 0;
        outline: none;
      }

      .timers {
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        max-width: 900px;
        padding: 10px 50px 20px;
        width: 100%;
      }
    `;
  }

  get timerInputs() {
    return this.shadowRoot.querySelectorAll('.timer-maker__input');
  }

  get firstInputToFocus() {
    return this.shadowRoot.querySelector('#first-input-focus');
  }

  /* eslint no-param-reassign: ["error", { "props": false }] */
  resetInputs() {
    this.timerInputs.forEach(timerInput => {
      timerInput.value = '';
    });
  }

  titleUpdated(event) {
    this.timerTitle = event.target.value;
  }

  secondsUpdated(event) {
    this.secondsToCount = event.target.value;
  }

  // updating the data model for each timer with the timers new value
  timerTick(event) {
    if (this.activeTimers[event.detail.id]) {
      this.activeTimers[event.detail.id].seconds = event.detail.count;
    }
  }

  // toggle the pause and unpause of each timer
  toggleTimerCountDown(event) {
    this.activeTimers[event.detail.id].isCountingDown =
      event.detail.isCountingDown;
  }

  // remove timer is a custom event passed to each timer
  removeTimer(event) {
    // filter all active timers unless the ID matches the ID passed by the event
    this.activeTimers = this.activeTimers.filter(
      timer => timer.id !== event.detail
    );
  }

  createNewTimer() {
    // early returns if the input have no values
    if (this.timerTitle.length === 0) {
      return;
    }
    if (this.secondsToCount <= 0) {
      return;
    }

    // make a new timer for the active timers array
    const newTimer = {
      title: this.timerTitle,
      seconds: this.secondsToCount,
      id: this.timerIdGen,
      isCountingDown: true,
      isCountComplete: false,
    };

    // this insures the timers always have a unique ID
    this.timerIdGen += 1;
    this.activeTimers = [...this.activeTimers, newTimer];

    // clean title and counter
    this.timerTitle = '';
    this.secondsToCount = 0;
    this.resetInputs();
    this.firstInputToFocus.focus();
  }

  render() {
    return html`
      <div class="timer-maker">
        <lion-form>
          <form>
            <lion-fieldset style="display:flex;" name="timer-details">
              <timer-input
                id="first-input-focus"
                class="timer-maker__input"
                @keyup=${this.titleUpdated}
                placeholder="Timer Name"
                name="timer-title"
                type="text"
                required
              ></timer-input>

              <timer-input
                class="timer-maker__input"
                @keyup=${this.secondsUpdated}
                placeholder="Amount of seconds"
                name="timer-count-seconds"
                type="number"
                required
              ></timer-input>

              <timer-button-create type="submit" @click=${this.createNewTimer}
                >Start Timer</timer-button-create
              >
            </lion-fieldset>
          </form>
        </lion-form>
      </div>

      <div class="timers">
        ${this.activeTimers.map(
          timer => html`
            <timer-item
              @timer-deleted=${this.removeTimer}
              @timer-tick=${this.timerTick}
              @timer-count-toggle=${this.toggleTimerCountDown}
              .timerID="${timer.id}"
              .timerTitle="${timer.title}"
              .secondsToCount="${timer.seconds}"
              .isCountingDown="${timer.isCountingDown}"
              .isCountComplete="${timer.isCountComplete}"
            ></timer-item>
          `
        )}
      </div>
    `;
  }
}
