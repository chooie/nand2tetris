import {
  assertEquals,
  assertStrictEquals,
  assertThrows,
} from "./utilities/asserts.ts";
import * as multiline from "./utilities/multiline.ts";

import * as parser from "./parser.ts";

import { describe, it } from "https://deno.land/std@0.158.0/testing/bdd.ts";

const test = describe("Parser");

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
  });
});

describe(test, "Removes excess", () => {
  it("strip all whitespace and comments for code block", () => {
    const sourceCode = multiline.stripIndent`
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
    const actual = parser.stripWhiteSpaceAndCommentsForCodeBlock(sourceCode);
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
