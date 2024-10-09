import { Effect, pipe } from "effect";

import { Float, Int } from "~/types";

import { ParseError } from "./errors";
import {
  SyntaxError as PeggySyntaxError,
  parse as parseVenderCollection,
} from "./peggy/collection";

export function parseString(value: string): Effect.Effect<string, ParseError> {
  return Effect.succeed(value.replaceAll("\r\n", "\n"));
}

export function parseStringNullable(
  value: string,
): Effect.Effect<string | null, ParseError> {
  if (value === "") {
    return Effect.succeed(null);
  }

  return parseString(value);
}

export function parseQuotedString(
  value: string,
): Effect.Effect<string, ParseError> {
  if (!value.startsWith('"') || !value.endsWith('"')) {
    return Effect.fail(new ParseError(`Value ("${value}") must be quoted.`));
  }

  return parseString(value).pipe(Effect.map((string) => string.slice(1, -1)));
}

export function parseQuotedStringNullable(
  value: string,
): Effect.Effect<string | null, ParseError> {
  if (value === "") {
    return Effect.succeed(null);
  }

  return parseQuotedString(value);
}

export function parseBoolean(
  value: string,
): Effect.Effect<boolean, ParseError> {
  if (!["True", "False"].includes(value)) {
    return Effect.fail(
      new ParseError(`Value ("${value}") must be "True" or "False"`),
    );
  }

  return Effect.succeed(value === "True");
}

export function parseBooleanNullable(
  value: string,
): Effect.Effect<boolean | null, ParseError> {
  if (value === "") {
    return Effect.succeed(null);
  }

  return parseBoolean(value);
}

export function parseInt(value: string): Effect.Effect<Int, ParseError> {
  if (!/^-?\d+$/u.test(value)) {
    return Effect.fail(
      new ParseError(`Value ("${value}") must look like an int`),
    );
  }

  return Effect.succeed(Int(Number.parseInt(value, 10)));
}

export function parseIntNullable(
  value: string,
): Effect.Effect<Int | null, ParseError> {
  if (value === "") {
    return Effect.succeed(null);
  }

  return parseInt(value);
}

export function parseFloat(value: string): Effect.Effect<Float, ParseError> {
  if (!/^-?\d+\.\d+$/u.test(value)) {
    return Effect.fail(
      new ParseError(`Value ("${value}") must look like a float`),
    );
  }

  return Effect.succeed(Float(Number.parseFloat(value)));
}

export function parseFloatNullable(
  value: string,
): Effect.Effect<Float | null, ParseError> {
  if (value === "") {
    return Effect.succeed(null);
  }

  return parseFloat(value);
}

export function parseList(data: string): Effect.Effect<string[], ParseError> {
  return pipe(
    parseListNullable(data),
    Effect.andThen((list) =>
      list === null
        ? Effect.fail(new ParseError(`Nonnullable List was null"`))
        : Effect.succeed(list),
    ),
  );
}

export function parseListNullable(
  data: string,
): Effect.Effect<string[] | null, ParseError> {
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

export function parseMap(
  data: string,
): Effect.Effect<Array<[string, string]>, ParseError> {
  return pipe(
    parseMapNullable(data),
    Effect.andThen((map) =>
      map === null
        ? Effect.fail(new ParseError(`Nonnullable Map was null"`))
        : Effect.succeed(map),
    ),
  );
}
export function parseMapNullable(
  data: string,
): Effect.Effect<Array<[string, string]> | null, ParseError> {
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
