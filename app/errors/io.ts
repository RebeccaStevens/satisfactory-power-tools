export class IOError {
  public readonly _tag = "IOError";

  public constructor(public readonly message: string) {}
}
