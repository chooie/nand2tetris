import outdent from "https://deno.land/x/outdent@v0.8.0/mod.ts";

export function stripIndent(str: TemplateStringsArray, ...args: unknown[]) {
  return outdent(str, ...args);
}
