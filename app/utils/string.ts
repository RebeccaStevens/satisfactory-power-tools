export function stripBom(string: string) {
  if (string.codePointAt(0) === 0xfe_ff) {
    return string.slice(1);
  }

  return string;
}
