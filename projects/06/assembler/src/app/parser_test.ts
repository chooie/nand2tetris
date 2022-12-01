import {
  assertEquals,
  assertStrictEquals,
  assertThrows,
} from "./utilities/asserts.ts";
import { describe, it } from "./utilities/bdd.ts";
import * as multiline from "./utilities/multiline.ts";

import * as parser from "./parser.ts";

const SOURCE_CODE = multiline.stripIndent`
  // This file is part of www.nand2tetris.org
  // and the book "The Elements of Computing Systems"
  // by Nisan and Schocken, MIT Press.
  // File name: projects/06/add/Add.asm

  // Computes R0 = 2 + 3  (R0 refers to RAM[0])

  @2
  D=A
  @3
  D=D+A
  @0
  M=D
`;

const test = describe("Parser");

describe(test, "Parses code block", () => {
  const actual = parser.parseCodeBlock(SOURCE_CODE);
  const expected = [
    {
      instructionType: "A",
      symbol: "2",
    },
    {
      instructionType: "C",
      dest: "D",
      comp: "A",
      jump: null,
    },
    {
      instructionType: "A",
      symbol: "3",
    },
    {
      comp: "D+A",
      dest: "D",
      instructionType: "C",
      jump: null,
    },
    {
      instructionType: "A",
      symbol: "0",
    },
    {
      comp: "D",
      dest: "M",
      instructionType: "C",
      jump: null,
    },
  ];
  assertEquals(actual, expected);
});

describe(test, "Instructions", () => {
  it("fails on empty string", () => {
    assertThrows(() => {
      parser.parseInstruction("");
    });
  });

  it("can parse an A instruction", () => {
    const actual = parser.parseInstruction("@foo");
    const expected = {
      instructionType: "A",
      symbol: "foo",
    } as const;

    assertEquals(actual, expected);
  });

  it("can parse an L instruction", () => {
    const actual = parser.parseInstruction("(FOO)");
    const expected = {
      instructionType: "L",
      symbol: "FOO",
    } as const;

    assertEquals(actual, expected);
  });

  describe("can parse a C instruction", () => {
    it("handles jump", () => {
      const actual = parser.parseInstruction("JLE");
      const expected = {
        instructionType: "C",
        dest: null,
        comp: null,
        jump: "JLE",
      } as const;

      assertEquals(actual, expected);
    });

    it("handles comp", () => {
      const actual = parser.parseInstruction("M");
      const expected = {
        instructionType: "C",
        dest: null,
        comp: "M",
        jump: null,
      } as const;

      assertEquals(actual, expected);
    });

    it("throws when jump or comp are invalid", () => {
      assertThrows<Error>(
        () => {
          parser.parseInstruction("NOTEXIST");
        },
        Error,
        "Unrecognized instruction",
      );
    });

    it("handles jump and comp", () => {
      const actual = parser.parseInstruction("0;JEQ");
      const expected = {
        instructionType: "C",
        dest: null,
        comp: "0",
        jump: "JEQ",
      };
      assertEquals(actual, expected);
    });

    it("handles dest and comp", () => {
      const actual = parser.parseInstruction("D=1");
      const expected = {
        instructionType: "C",
        dest: "D",
        comp: "1",
        jump: null,
      };
      assertEquals(actual, expected);
    });

    it("handles dest, comp, and jump", () => {
      const actual = parser.parseInstruction("D=1;JGT");
      const expected = {
        instructionType: "C",
        dest: "D",
        comp: "1",
        jump: "JGT",
      };
      assertEquals(actual, expected);
    });
  });
});

describe(test, "Removes excess", () => {
  it("strip all whitespace and comments for code block", () => {
    const actual = parser.stripWhiteSpaceAndCommentsForCodeBlock(SOURCE_CODE);
    const expected = ["@2", "D=A", "@3", "D=D+A", "@0", "M=D"];

    assertEquals(actual, expected);
  });

  it("strips whitespace and comments by line", () => {
    assertStrictEquals(parser.stripWhiteSpaceAndCommentForLine(" "), "");
    assertStrictEquals(parser.stripWhiteSpaceAndCommentForLine(" I"), "I");
    assertStrictEquals(parser.stripWhiteSpaceAndCommentForLine("I "), "I");
    assertStrictEquals(
      parser.stripWhiteSpaceAndCommentForLine("  @foo  "),
      "@foo",
    );
    assertStrictEquals(parser.stripWhiteSpaceAndCommentForLine("// hey"), "");
    assertStrictEquals(
      parser.stripWhiteSpaceAndCommentForLine("// hey //"),
      "",
    );
    assertStrictEquals(
      parser.stripWhiteSpaceAndCommentForLine("   // hey"),
      "",
    );
    assertStrictEquals(
      parser.stripWhiteSpaceAndCommentForLine("@foo // hey"),
      "@foo",
    );
    assertStrictEquals(
      parser.stripWhiteSpaceAndCommentForLine("    @foo // hey"),
      "@foo",
    );
  });
});
