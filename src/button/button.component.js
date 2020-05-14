import { LionButton } from '@lion/button';
import { html, css } from "lit-element";

export class TimerButton extends LionButton {
    static get styles() {
        return [
            ...super.styles,
            css`
                :host {
                    display: block;
                }
                .btn {
                    background-color: blue;
                }
            `
        ]
    }

    render() {
        return html`
            <lion-button>Button Text</lion-button>
        `;
      }
}
customElements.define('timer-button', TimerButton);