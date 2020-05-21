import { LionButton } from '@lion/button';
import { css } from 'lit-element';

export class TimerButton extends LionButton {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: block;
          max-width: fit-content;
          width: 100%;
        }
        .btn {
          align-items: center;
          background-color: transparent;
          color: #ffffff;
          display: flex;
          font-size: 12px;
          justify-content: center;
          max-width: fit-content;
          padding: 12px;
          text-transform: uppercase;
          transition: all 0.2s ease-in;
        }
        :host .btn:hover,
        :host .btn:active,
        :host(:hover) .btn,
        :host([hover]) .btn,
        :host(:active) .btn,
        :host([active]) .btn {
          background-color: #18bd09;
          background: #18bd09;
        }
      `,
    ];
  }
}
customElements.define('timer-button', TimerButton);
