import * as assembler from "./assembler.ts";

const filePath = Deno.args[0];

const sourceCode = await assembler.readTextFile(filePath);

if (assembler.isReadTextFileError(sourceCode)) {
  throw new Error(JSON.stringify(sourceCode, undefined, 2));
}

const machineCode = assembler.assemble(sourceCode);

const destinationFilePath = assembler.getDestinationFilePath(filePath);

await assembler.writeTextFile(destinationFilePath, machineCode);
