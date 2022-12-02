// File name is prefixed with 1_ so it is at the top

import * as code from "./code.ts";
import * as parser from "./parser.ts";

export function assemble(sourceCode: string) {
  const parsedInstructions = parser.parseCodeBlock(sourceCode);
  const binaryInstructions = parsedInstructions.map((instruction) => {
    if (isAInstruction(instruction)) {
      const { symbol } = instruction;
      return code.convertAInstruction({ symbol });
    }

    if (isCInstruction(instruction)) {
      const { dest, comp, jump } = instruction;
      return code.convertCInstruction({ dest, comp, jump });
    }

    throw new Error(`Unrecognized instruction ${instruction}`);
  });

  return binaryInstructions.join("\n");
}

function isAInstruction(
  instruction: parser.Instruction,
): instruction is parser.A_Instruction {
  return instruction.instructionType === "A";
}

function isCInstruction(
  instruction: parser.Instruction,
): instruction is parser.C_Instruction {
  return instruction.instructionType === "C";
}

export async function readTextFile(absolutePath: string) {
  try {
    return await Deno.readTextFile(absolutePath);
  } catch (error) {
    // if (error instanceof Deno.errors.NotFound) {
    return {
      isError: true,
      errorType: error.name,
      errorMessage: error.message,
      attemptedPath: absolutePath,
    };
  }
}

export async function writeTextFile(absolutePath: string, content: string) {
  return await Deno.writeTextFile(absolutePath, content);
}
