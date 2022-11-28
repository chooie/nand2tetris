import { assertStrictEquals } from "./utilities/asserts.ts";
import * as path from "./utilities/path.ts";

import * as assembler from "./1_main_assembler.ts";

const __directoryPath = path.dirname(path.fromFileUrl(import.meta.url));

Deno.test("Assembler", async (t) => {
  await t.step("is true", () => {
    assertStrictEquals(true, true);
  });
  await t.step("is false", () => {
    assertStrictEquals(false, false);
  });
  await t.step("can do async checks", async () => {
    const result = await new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve("returns");
      }, 20);
    });
    assertStrictEquals(result, "returns");
  });

  await t.step("can get hello world", () => {
    const actual = assembler.run();
    assertStrictEquals(actual, "Hello, world");
  });

  await t.step("Can read from a particular file", async () => {
    const actual = await assembler.readTextFile(
      `${__directoryPath}/test_files/file.txt`,
    );
    assertStrictEquals(actual, "Hello, world!");
  });

  await t.step("Can write to a particular file", async () => {
    const actual = await assembler.readTextFile(
      `${__directoryPath}/test_files/file.generated.txt`,
    );
    assertStrictEquals(actual, "Hello, world!");
  });
});
