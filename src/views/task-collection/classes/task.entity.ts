export default class TaskEntity {
  public constructor(
    private readonly _taskId: string,
    private readonly _description: string,
    private _completed: boolean
  ) {}

  public get taskId(): string {
    return this._taskId;
  }

  public get description(): string {
    return this._description;
  }

  public get completed(): boolean {
    return this._completed;
  }

  public set completed(value: boolean) {
    this._completed = value;
  }
}
