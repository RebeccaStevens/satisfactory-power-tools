export class ParseError {
  public readonly _tag = "ParseError";
  public constructor(public readonly message: string) {}
}
