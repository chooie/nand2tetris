// For parsing the input into instructions and instructions into fields

type A_Instruction = {
  instructionType: "A";
  symbol: string;
};

type C_Instruction = {
  instructionType: "C";
  jump: "JLE";
};

type L_Instruction = {
  instructionType: "L";
  symbol: string;
};

const COMP_INSTRUCTIONS = {
  "0": "0",
  "1": "1",
  "-1": "-1",
  D: "D",
  A: "A",
  "!D": "!D",
  "!A": "!A",
  "-D": "-D",
  "-A": "-A",
  "D+1": "D+1",
  "A+1": "A+1",
  "D-1": "D-1",
  "A-1": "A-1",
  "D+A": "D+A",
  "D-A": "D-A",
  "A-D": "A-D",
  "D&A": "D&A",
  "D|A": "D|A",
  M: "M",
  "!M": "!M",
  "M+1": "M+1",
  "M-1": "M-1",
  "D+M": "D+M",
  "D-M": "D-M",
  "M-D": "M-D",
  "D&M": "D&M",
  "D|M": "D|M",
} as const;

const JUMP_INSTRUCTIONS = {
  JGT: "JGT",
  JEQ: "JEQ",
  JGE: "JGE",
  JLT: "JLT",
  JNE: "JNE",
  JLE: "JLE",
  JMP: "JMP",
} as const;

export function parseInstruction(
  str: string,
): A_Instruction | C_Instruction | L_Instruction | unknown {
  if (str === "") {
    throw new Error("String must not be empty");
  }

  const firstCharacter = str[0];

  if (firstCharacter === "@") {
    return {
      instructionType: "A",
      symbol: str.substring(1, str.length),
    };
  }

  if (firstCharacter === "(") {
    return {
      instructionType: "L",
      symbol: str.substring(1, str.length - 1),
    };
  }

  // Find ;
  // Find =
  // No (; or =)? Then either c instruction or jump instruction

  const cInstruction = {
    instructionType: "C",
  };

  const equalIndex = str.indexOf("=");
  const semiColonIndex = str.indexOf(";");

  if (isSingleInstruction(equalIndex, semiColonIndex)) {
    let jump = null;
    let comp = null;

    if (isJumpInstruction(str)) {
      jump = JUMP_INSTRUCTIONS[str];
    }

    if (isCompInstruction(str)) {
      comp = COMP_INSTRUCTIONS[str];
    }

    return {
      ...cInstruction,
      dest: null,
      jump,
      comp,
    };
  }
}

function isSingleInstruction(equalIndex: number, semiColonIndex: number) {
  return equalIndex < 0 && semiColonIndex < 0;
}

function isJumpInstruction(str: string): str is keyof typeof JUMP_INSTRUCTIONS {
  return str in JUMP_INSTRUCTIONS;
}

function isCompInstruction(str: string): str is keyof typeof COMP_INSTRUCTIONS {
  return str in COMP_INSTRUCTIONS;
}

export function stripWhiteSpaceAndCommentsForCodeBlock(codeBlock: string) {
  const lines = codeBlock.split("\n");
  const result: string[] = [];

  lines.forEach((line) => {
    const lineResult = stripWhiteSpaceAndCommentForLine(line);

    if (lineResult != "") {
      result.push(lineResult);
    }
  });

  return result;
}

export function stripWhiteSpaceAndCommentForLine(lineCode: string) {
  let result = "";

  for (let i = 0; i < lineCode.length; i++) {
    const currentCharacter = lineCode[i];
    const nextCharacter = lineCode[i + 1];
    if (currentCharacter === "/" && nextCharacter === "/") {
      // We just stop looking at the rest of the line when we come across a
      // comment
      break;
    }

    if (currentCharacter !== " ") {
      result += currentCharacter;
    }
  }

  return result;
}