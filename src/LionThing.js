import { LitElement, html, css } from 'lit-element';
import './timer-maker/timer-maker.component.js'

export class LionThing extends LitElement {

  static get styles() {
    return css`
      :host {
        color: #333333;
        display: block;
        font-size: 16px;
      }

      header {
        background-color: #ffffff;
      }

      h1 {
        color: #2b3e50;
        font-size: 30px;
        margin: 0;
        padding: 25px;
        text-align: center;
        width: 100%;
      }

      main {
        background-color: #2b3e50;
        height: 100vh;
        width: 100vw;
      }
    `;
  }

  render() {
    return html`
      <header>
        <h1>Make a new timer</h1>
      </header>
      <main>
        <timer-maker></timer-maker>
      </main>
    `;
  }
}
