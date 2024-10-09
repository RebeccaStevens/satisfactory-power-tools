import { Effect } from "effect";

import { ParseError } from "./errors";
import {
  SyntaxError as PeggySyntaxError,
  parse as parseVenderCollection,
} from "./peggy/collection";

export function parseVendorString(
  value: string,
): Effect.Effect<string, ParseError> {
  return Effect.succeed(value.replaceAll("\r\n", "\n"));
}

export function parseVendorStringNullable(
  value: string,
): Effect.Effect<string | null, ParseError> {
  if (value === "") {
    return Effect.succeed(null);
  }

  return parseVendorString(value);
}

export function parseVendorQuotedString(
  value: string,
): Effect.Effect<string, ParseError> {
  if (!value.startsWith('"') || !value.endsWith('"')) {
    return Effect.fail(new ParseError(`Value ("${value}") must be quoted.`));
  }

  return parseVendorString(value).pipe(
    Effect.map((string) => string.slice(1, -1)),
  );
}

export function parseVendorQuotedStringNullable(
  value: string,
): Effect.Effect<string | null, ParseError> {
  if (value === "") {
    return Effect.succeed(null);
  }

  return parseVendorQuotedString(value);
}

export function parseVendorBoolean(
  value: string,
): Effect.Effect<boolean, ParseError> {
  if (!["True", "False"].includes(value)) {
    return Effect.fail(
      new ParseError(`Value ("${value}") must be "True" or "False"`),
    );
  }

  return Effect.succeed(value === "True");
}

export function parseVendorBooleanNullable(
  value: string,
): Effect.Effect<boolean | null, ParseError> {
  if (value === "") {
    return Effect.succeed(null);
  }

  return parseVendorBoolean(value);
}

export function parseVendorInt(
  value: string,
): Effect.Effect<number, ParseError> {
  if (!/^-?\d+$/u.test(value)) {
    return Effect.fail(
      new ParseError(`Value ("${value}") must look like an int`),
    );
  }

  return Effect.succeed(Number.parseInt(value, 10));
}

export function parseVendorIntNullable(
  value: string,
): Effect.Effect<number | null, ParseError> {
  if (value === "") {
    return Effect.succeed(null);
  }

  return parseVendorInt(value);
}

export function parseVendorFloat(
  value: string,
): Effect.Effect<number, ParseError> {
  if (!/^-?\d+\.\d+$/u.test(value)) {
    return Effect.fail(
      new ParseError(`Value ("${value}") must look like a float`),
    );
  }

  return Effect.succeed(Number.parseFloat(value));
}

export function parseVendorFloatNullable(
  value: string,
): Effect.Effect<number | null, ParseError> {
  if (value === "") {
    return Effect.succeed(null);
  }

  return parseVendorFloat(value);
}

export function parseVendorNumber(
  value: string,
): Effect.Effect<number, ParseError> {
  if (/^-?\d+$/u.test(value)) {
    return parseVendorInt(value);
  }
  if (/^-?\d+\.\d+$/u.test(value)) {
    return parseVendorFloat(value);
  }

  return Effect.fail(
    new ParseError(`Value ("${value}") must look like a number`),
  );
}

export function parseVendorNumberNullable(
  value: string,
): Effect.Effect<number | null, ParseError> {
  if (value === "") {
    return Effect.succeed(null);
  }

  return parseVendorNumber(value);
}

export function parseVendorList(
  data: string,
): Effect.Effect<string[], ParseError> {
  return Effect.try({
    try: () =>
      parseVenderCollection(data, {
        startRule: "List",
        grammarSource: "collection.peggy",
      }) as string[],
    catch: (error) =>
      new ParseError(
        error instanceof PeggySyntaxError
          ? `List parse error\n${error.format([
              {
                source: "collection.peggy",
                text: data,
              },
            ])}`
          : String(error),
      ),
  });
}

export function parseVendorMap(
  data: string,
): Effect.Effect<Array<[string, string]>, ParseError> {
  return Effect.try({
    try: () =>
      parseVenderCollection(data, {
        startRule: "Map",
        grammarSource: "collection.peggy",
      }) as Array<[string, string]>,
    catch: (error) =>
      new ParseError(
        error instanceof PeggySyntaxError
          ? `Map parse error\n${error.format([
              {
                source: "collection.peggy",
                text: data,
              },
            ])}`
          : String(error),
      ),
  });
}
