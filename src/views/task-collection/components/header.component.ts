import { css, html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-task-header")
export default class TaskHeaderComponent extends LitElement {
  /** Styles */
  static override styles = css`
    .content-wrapper {
      padding: 2em;
    }

    .title {
      font-size: clamp(0.8em, 0.8em + 0.7vw, 1.8em);
      opacity: 50%;

      font-family: "Fira Code", monospace;
    }
  `;

  /** Properties */

  public override render(): TemplateResult {
    return html`
      <div class="content-wrapper">
        <div class="content-wrapper-inner">
          <label class="title"> Trask Tracker </label>
        </div>
      </div>
    `;
  }
}
