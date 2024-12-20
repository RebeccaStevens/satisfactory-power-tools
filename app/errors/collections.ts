export class LookupError {
  public readonly _tag = "LookupError";

  public constructor(public readonly message: string) {}
}
