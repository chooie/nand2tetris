import { assertEquals, assertStrictEquals } from "./utilities/asserts.ts";
import * as path from "./utilities/path.ts";

import * as assembler from "./1_main_assembler.ts";

const __directoryPath = path.dirname(path.fromFileUrl(import.meta.url));

Deno.test("Assembler", async (t) => {
  await t.step("Files", async (t) => {
    await t.step("Can read from a particular file", async () => {
      const actual = await assembler.readTextFile(
        `${__directoryPath}/test_files/file.txt`,
      );
      assertStrictEquals(actual, "Hello, world!");
    });

    await t.step("Gets an error object when read fails", async () => {
      const actual = await assembler.readTextFile(
        `${__directoryPath}/test_files/file_does_not_exist.txt`,
      );
      assertEquals(actual, {
        attemptedPath:
          "/Users/chooie/code/nand2tetris/projects/06/assembler/src/app/test_files/file_does_not_exist.txt",
        errorMessage: "No such file or directory (os error 2)",
        errorType: "NotFound",
        isError: true,
      });
    });

    await t.step("Can write to a particular file", async () => {
      const actual = await assembler.writeTextFile(
        `${__directoryPath}/test_files/file.generated.txt`,
        "Foo",
      );
      assertStrictEquals(actual, undefined);
    });

    await t.step("Can write and then read a file", async () => {
      const filePath = `${__directoryPath}/test_files/file_write.generated.txt`;
      const timeNow = Date.now();

      await assembler.writeTextFile(filePath, `${timeNow}`);

      const actual = await assembler.readTextFile(filePath);

      assertStrictEquals(actual, `${timeNow}`);
    });
  });
});
