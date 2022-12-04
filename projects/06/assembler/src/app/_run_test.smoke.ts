import { assertStrictEquals, describe, it } from "@test_deps";

import * as assembler from "./assembler.ts";

describe("Run smoke test", () => {
  it("can assemble a Pong assembly file", async () => {
    await runCommand("rm -f ./src/app/test_files/Pong.hack");

    const status = await runCommand(
      "deno run --allow-read --allow-write ./src/app/run.ts ./src/app/test_files/Pong.asm",
    );
    assertStrictEquals(status.success, true);

    const generatedFileContents = await assembler.readTextFile(
      "./src/app/test_files/Pong.hack",
    );
    const expectedFileContents = await assembler.readTextFile(
      "./src/app/test_files/Pong.KEEP.hack",
    );

    assertStrictEquals(generatedFileContents, expectedFileContents);
  });
});

async function runCommand(command: string): Promise<Deno.ProcessStatus> {
  const process = Deno.run({
    cmd: command.split(" "),
  });
  const status = await process.status();
  process.close();

  if (!status.success) {
    throw new Error("Command failed");
  }

  return status;
}
