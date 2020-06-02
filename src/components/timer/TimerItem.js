import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import '../button/timer-button.js';
import convertSecondsUI from '../../utils/convertSeconds.js';

export class Timer extends LitElement {
  static get styles() {
    return css`
      .timer {
        background-color: #f2cd0d;
        display: block;
        margin: 0 10px 20px 0;
        padding: 20px;
      }
      .timer--active {
        background-color: #1bd90b;
      }
      .timer--ended {
        background-color: #ef0b0c;
      }
      h2 {
        color: white;
        font-size: 14px;
        font-weight: 300;
        letter-spacing: 1px;
      }
      p {
        color: white;
        font-size: 74px;
        font-weight: 100;
        margin: 20px 0;
        text-align: center;
      }
      .timer__buttons {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
    `;
  }

  static get properties() {
    return {
      id: { type: Number },
      timerTitle: { type: String },
      secondsToCount: { type: Number },
      isCountingDown: { type: Boolean },
      isCountComplete: { type: Boolean },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateCount();
    this.styleClasses = {
      'timer--active': this.isCountingDown,
      'timer--ended': this.isCountComplete,
    };
  }

  disconnectedCallback() {
    this.isCountingDown = false;
    this.isCountComplete = true;
  }

  removeTimer() {
    // this custom event is passed from timer-maker to remove it from the array
    this.isCountingDown = true;
    this.dispatchEvent(
      new CustomEvent('timer-deleted', { detail: this.timerID })
    );
  }

  toggleCountDown() {
    // this custom event is used to control the pause toggle
    this.isCountingDown = !this.isCountingDown;
    this.dispatchEvent(
      new CustomEvent('timer-count-toggle', {
        detail: { id: this.timerID, isCountingDown: this.isCountingDown },
      })
    );
  }

  updateCount() {
    // timer tick will be a variable so it can be cleared when completed
    let timerTick;

    if (!this.isCountComplete) {
      timerTick = setInterval(() => {
        // stop counter going below 0
        if (this.isCountingDown) {
          this.secondsToCount =
            this.secondsToCount > 1 ? this.secondsToCount - 1 : 0;
          this.dispatchEvent(
            new CustomEvent('timer-tick', {
              detail: { id: this.timerID, count: this.secondsToCount },
            })
          );
        }

        // when counter hit 0 it stops counting down
        if (this.secondsToCount === 0) {
          this.isCountComplete = true;
          clearInterval(timerTick);
        }
      }, 1000);
    }
  }

  render() {
    return html`
      <div class="timer ${classMap(this.styleClasses)}">
        <h2>${this.timerTitle}</h2>
        <p>${convertSecondsUI(this.secondsToCount, new Date(null))}</p>

        <div class="timer__buttons">
          <timer-button
            type="button"
            class="timer__input"
            @click=${this.removeTimer}
            >Delete</timer-button
          >
          <timer-button
            type="button"
            class="timer__input"
            @click=${this.toggleCountDown}
            >Pause</timer-button
          >
        </div>
      </div>
    `;
  }
}
