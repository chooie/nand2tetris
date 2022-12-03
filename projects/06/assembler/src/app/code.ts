// For translating the fields (symbolic mnemonics) into binary codes

import * as symbol from "./symbol.ts";

const MAX_SUPPORTED_INTEGER = 32767;

export type Instruction = A_Instruction | C_Instruction;

export type A_Instruction = {
  symbol: string;
};

export function convertAInstruction(
  symbolTable: symbol.SymbolTable,
  instruction: A_Instruction,
) {
  const { symbol } = instruction;

  const theNumber = isInteger(symbol)
    ? parseInt(symbol)
    : symbolTable.getSymbolAddress(symbol);

  if (theNumber > MAX_SUPPORTED_INTEGER) {
    throw new Error(
      `Number '${symbol}' is too high. Max number is ${MAX_SUPPORTED_INTEGER}`,
    );
  }

  const binaryString = convertNumberToBinaryString(theNumber);
  const binaryString15Bit = convertNumberTo15BitBinaryString(binaryString);

  return `0${binaryString15Bit}`;
}

function isInteger(symbol: string) {
  return /^\d+$/.test(symbol);
}

export function convertNumberTo15BitBinaryString(binaryString: string) {
  const numberOfDigits = binaryString.length;
  let digitsToPrepend = 15 - numberOfDigits;

  let result = binaryString;
  while (digitsToPrepend > 0) {
    result = `0${result}`;
    digitsToPrepend -= 1;
  }
  return result;
}

export function convertNumberToBinaryString(theNumber: number) {
  if (theNumber === 0) {
    return "0";
  }

  let binaryNumbers = "";
  let currentNumber = theNumber;

  while (currentNumber !== 0) {
    const quotient = Math.trunc(currentNumber / 2);
    const remainder = currentNumber % 2;
    binaryNumbers = `${remainder}${binaryNumbers}`;
    currentNumber = quotient;
  }

  return binaryNumbers;
}

export type C_Instruction = {
  dest: keyof typeof DEST_MAPPING | null;
  comp: keyof typeof COMP_MAPPING | null;
  jump: keyof typeof JUMP_MAPPING | null;
};

export function convertCInstruction(instruction: C_Instruction) {
  const { dest, comp, jump } = instruction;
  const destCode = convertDest(dest);
  const compCode = convertComp(comp);
  const jumpCode = convertJump(jump);

  return `111${compCode}${destCode}${jumpCode}`;
}

// prettier-ignore
// deno-fmt-ignore
const DEST_MAPPING = {
  M  : "001",
  D  : "010",
  MD : "011",
  A  : "100",
  AM : "101",
  AD : "110",
  AMD: "111",
} as const;

export function convertDest(instruction: string | null) {
  if (!isDestInstruction(instruction)) {
    throw new Error(`Unrecognized instruction ${instruction}`);
  }

  if (instruction === null) {
    return "000";
  }

  return DEST_MAPPING[instruction];
}

function isDestInstruction(
  str: string | null,
): str is keyof typeof DEST_MAPPING {
  return str === null || str in DEST_MAPPING;
}

// prettier-ignore
// deno-fmt-ignore
export const COMP_MAPPING = {
  "0"  : "0101010",
  "1"  : "0111111",
  "-1" : "0111010",
  D    : "0001100",
  A    : "0110000",
  "!D" : "0001101",
  "!A" : "0110001",
  "-D" : "0001111",
  "-A" : "0110011",
  "D+1": "0011111",
  "A+1": "0110111",
  "D-1": "0001110",
  "A-1": "0110010",
  "D+A": "0000010",
  "D-A": "0010011",
  "A-D": "0000111",
  "D&A": "0000000",
  "D|A": "0010101",
  M    : "1110000",
  "!M" : "1110001",
  "-M" : "1110011",
  "M+1": "1110111",
  "M-1": "1110010",
  "D+M": "1000010",
  "D-M": "1010011",
  "M-D": "1000111",
  "D&M": "1000000",
  "D|M": "1010101",
} as const;

export function convertComp(instruction: string | null) {
  if (!isCompInstruction(instruction)) {
    throw new Error(`Unrecognized instruction ${instruction}`);
  }

  if (instruction === null) {
    return "UNKNOWN?";
  }

  return COMP_MAPPING[instruction];
}

function isCompInstruction(
  str: string | null,
): str is keyof typeof COMP_MAPPING {
  return str === null || str in COMP_MAPPING;
}

// prettier-ignore
// deno-fmt-ignore
const JUMP_MAPPING = {
  JGT: "001",
  JEQ: "010",
  JGE: "011",
  JLT: "100",
  JNE: "101",
  JLE: "110",
  JMP: "111",
} as const;

export function convertJump(instruction: string | null) {
  if (!isJumpInstruction(instruction)) {
    throw new Error(`Unrecognized instruction ${instruction}`);
  }

  if (instruction === null) {
    return "000";
  }

  return JUMP_MAPPING[instruction];
}

function isJumpInstruction(
  str: string | null,
): str is keyof typeof JUMP_MAPPING {
  return str === null || str in JUMP_MAPPING;
}
