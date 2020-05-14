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
                    color: white;
                    text-transform: uppercase
                }
            `
        ]
    }

}
customElements.define('timer-button', TimerButton);