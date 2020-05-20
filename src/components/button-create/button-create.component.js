import { LionButton } from '@lion/button';
import { css } from "lit-element";

export class TimerButton extends LionButton {
    static get styles() {
        return [
            ...super.styles,
            css`
                :host {
                    display: block;
                    width: 100%;
                }
                .btn {
                    align-items: center;
                    background-color: #3398db;
                    color: #ffffff;
                    display: flex;
                    font-size: 12px;
                    justify-content: center;
                    padding: 16px 8px;
                    text-transform: uppercase;
                }
                :host .btn:hover,
                :host .btn:active {
                    background-color: #2b81bb;
                }
            `
        ]
    }

}
customElements.define('timer-button-create', TimerButton);