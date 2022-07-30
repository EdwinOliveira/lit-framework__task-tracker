import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import TaskEntity from "./classes/task.entity";
import * as uuid from "uuid";

@customElement("app-task-collection")
export default class TaskCollectionView extends LitElement {
  public constructor() {
    super();
  }

  /** Styles */
  static override styles = css`
    .content-wrapper {
      min-height: 100vh;
    }

    .content-wrapper-inner {
      min-height: inherit;

      display: flex;
      flex-direction: column;
    }

    .task-collection {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
  `;

  /** Properties */
  @property({ type: Array, attribute: false })
  private readonly _taskCollection: Array<TaskEntity> = new Array<TaskEntity>(
    new TaskEntity(uuid.v4(), "Clean Room", true),
    new TaskEntity(uuid.v4(), "Clean Kitchen", true)
  );

  public updateTask(data: CustomEvent): void {
    this._taskCollection.map((task) => {
      if (task.taskId.match(data.detail.taskId)) {
        task.completed = data.detail.completed;
      }

      return task;
    });
  }

  public override render(): TemplateResult {
    return html`
      <div class="content-wrapper">
        <div class="content-wrapper-inner">
          <app-task-header></app-task-header>
          <div class="task-collection">
            ${this._taskCollection.map(
              (task) =>
                html`<app-task
                  .taskEntity=${task}
                  @update-task=${this.updateTask}
                ></app-task>`
            )}
          </div>
        </div>
      </div>
    `;
  }
}
