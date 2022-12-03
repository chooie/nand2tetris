// File name is prefixed with 1_ so it is at the top
import * as multiline from "@utils/multiline.ts";

import * as code from "./code.ts";
import * as parser from "./parser.ts";
import * as symbol from "./symbol.ts";

export function assemble(sourceCode: string) {
  const symbolTable = symbol.makeSymbolTable();
  const parsedInstructions = parser.parseCodeBlock(sourceCode);
  let LInstructionsSoFar = 0;
  const parsedInstructionsLessLInstructions = parsedInstructions.filter(
    (parsedInstruction, instructionNumber) => {
      if (isLInstruction(parsedInstruction)) {
        LInstructionsSoFar += 1;
        const { symbol } = parsedInstruction;
        symbolTable.add(
          symbol,
          // Next line is what the symbol should point to
          // We also need to track how many LInstructions have been in the code
          // so far, because they get removed (and so our instruction gets
          // shifted up to account for this)
          instructionNumber + 1 - LInstructionsSoFar,
        );
        return false;
      }

      return true;
    },
  );
  const binaryInstructions = parsedInstructionsLessLInstructions.map(
    (instruction) => {
      if (isAInstruction(instruction)) {
        const { symbol } = instruction;
        return code.convertAInstruction(symbolTable, { symbol });
      }

      if (isCInstruction(instruction)) {
        const { dest, comp, jump } = instruction;
        return code.convertCInstruction({ dest, comp, jump });
      }

      if (isLInstruction(instruction)) {
        const { symbol } = instruction;
        throw new Error(
          multiline.stripIndent`
          L instruction was still present. These need to be parsed out in the
          initial pass: ${symbol}
        `,
        );
      }

      throw new Error(
        `Unrecognized instruction ${JSON.stringify(instruction, undefined, 2)}`,
      );
    },
  );

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

function isLInstruction(
  instruction: parser.Instruction,
): instruction is parser.L_Instruction {
  return instruction.instructionType === "L";
}

interface ReadTextFileError {
  isError: true;
  errorType: string;
  errorMessage: string;
  attemptedPath: string;
}

export async function readTextFile(
  absolutePath: string,
): Promise<string | ReadTextFileError> {
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

export function isReadTextFileError(
  value: string | ReadTextFileError,
): value is ReadTextFileError {
  if (typeof value === "string") {
    return false;
  }

  return "isError" in value;
}

export async function writeTextFile(absolutePath: string, content: string) {
  return await Deno.writeTextFile(absolutePath, content);
}
