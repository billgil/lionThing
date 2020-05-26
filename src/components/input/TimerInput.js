import { css } from 'lit-element';
import { LionInput } from '@lion/input';

export class TimerInput extends LionInput {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: block;
          font-size: 12px;
          width: 100%;
        }
        :host ::slotted(.form-control) {
          display: block;
          padding: 16px 8px;
        }
      `,
    ];
  }
}
