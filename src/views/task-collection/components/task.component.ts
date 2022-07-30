import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import TaskEntity from "../classes/task.entity";

@customElement("app-task")
export default class TaskComponent extends LitElement {
  /** Styles */
  static override styles = css`
    .content-wrapper {
      background: #2c2c2c;
      box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.25);
      border-radius: 4px;

      padding: 1.4em 0.8em;

      margin: 0em 2em;
    }

    .content-wrapper-inner {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .text {
      font-size: clamp(0.6em, 0.6em + 0.5vw, 1.6em);

      font-family: "Fira Code", monospace;
    }

    .box {
      height: 1em;
      width: 1em;
      background: #2c2c2c;

      box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.25);
    }

    .active {
      background: #ff6a6a;
    }
  `;

  /** Properties */
  @property({ type: Object })
  public readonly taskEntity: TaskEntity | null = null;

  @property({ type: Boolean })
  public taskCompleted = false;

  public constructor() {
    super();
  }

  override connectedCallback() {
    super.connectedCallback();

    this.taskCompleted = this.taskEntity!.completed;
  }

  public updateTaskStatus(): void {
    this.taskCompleted = !this.taskEntity!.completed;

    this.dispatchEvent(
      new CustomEvent("update-task", {
        detail: {
          taskId: this.taskEntity?.taskId,
          completed: !this.taskEntity?.completed,
        },
      })
    );
  }

  public override render(): TemplateResult {
    const classes = {
      active: this.taskCompleted,
    };

    return html`
      <div class="content-wrapper">
        <div class="content-wrapper-inner">
          <span class="text">${this.taskEntity?.description}</span>
          <div
            class="box ${classMap(classes)}"
            @click="${this.updateTaskStatus}"
          ></div>
        </div>
      </div>
    `;
  }
}
