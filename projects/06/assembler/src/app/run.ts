import * as assembler from "./assembler.ts";

await run();

async function run() {
  const filePath = Deno.args[0];

  if (!filePath) {
    console.log("You must pass a filePath");
    return;
  }

  if (filePath === "") {
    console.log("filePath must not be empty");
    return;
  }

  const sourceCode = await assembler.readTextFile(filePath);

  if (assembler.isReadTextFileError(sourceCode)) {
    throw new Error(JSON.stringify(sourceCode, undefined, 2));
  }

  const machineCode = assembler.assemble(sourceCode);

  const destinationFilePath = assembler.getDestinationFilePath(filePath);

  await assembler.writeTextFile(destinationFilePath, machineCode);

  console.log(`Generated ${destinationFilePath}`);
}
