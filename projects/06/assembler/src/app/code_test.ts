import { /*assertEquals,*/ assertStrictEquals } from "./utilities/asserts.ts";
import { describe, it } from "./utilities/bdd.ts";

import * as code from "./code.ts";

describe("Code", () => {
  it("converts A instructions", () => {
    assertStrictEquals(
      code.convertAInstruction({
        symbol: "0",
      }),
      "0000000000000000",
    );

    assertStrictEquals(
      code.convertAInstruction({
        symbol: "1",
      }),
      "0000000000000001",
    );

    assertStrictEquals(
      code.convertAInstruction({
        symbol: "32767",
      }),
      "0111111111111111",
    );
  });

  it("converts base 10 integer to 15-bit binary string", () => {
    assertStrictEquals(
      code.convertNumberTo15BitBinaryString("0"),
      "000000000000000",
    );
    assertStrictEquals(
      code.convertNumberTo15BitBinaryString("100"),
      "000000000000100",
    );
    assertStrictEquals(
      code.convertNumberTo15BitBinaryString("1101"),
      "000000000001101",
    );
    assertStrictEquals(
      code.convertNumberTo15BitBinaryString("11101101"),
      "000000011101101",
    );
  });

  it("converts base 10 integer to binary string", () => {
    assertStrictEquals(code.convertNumberToBinaryString(0), "0");
    assertStrictEquals(code.convertNumberToBinaryString(4), "100");
    assertStrictEquals(code.convertNumberToBinaryString(13), "1101");
    assertStrictEquals(code.convertNumberToBinaryString(237), "11101101");
  });

  it("converts C instructions", () => {
    assertStrictEquals(
      code.convertCInstruction({
        dest: "D",
        comp: "D+1",
        jump: "JLE",
      }),
      "1110011111010110",
    );
    assertStrictEquals(
      code.convertCInstruction({
        dest: "D",
        comp: "D+1",
        jump: "JLE",
      }),
      "1110011111010110",
    );
  });

  it("converts dest instructions", () => {
    assertStrictEquals(code.convertDest(null), "000");
    assertStrictEquals(code.convertDest("AMD"), "111");
  });

  it("converts comp instructions", () => {
    // TODO(chooie): what do we do for null?
    assertStrictEquals(code.convertComp(null), "UNKNOWN?");
    assertStrictEquals(code.convertComp("0"), "0101010");
  });

  it("converts jump instructions", () => {
    assertStrictEquals(code.convertJump(null), "000");
    assertStrictEquals(code.convertJump("JGT"), "001");
    assertStrictEquals(code.convertJump("JLT"), "100");
    assertStrictEquals(code.convertJump("JMP"), "111");
  });
});
