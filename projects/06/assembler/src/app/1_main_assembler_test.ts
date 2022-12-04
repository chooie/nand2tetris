import { path } from "@deps";

import { assertEquals, assertStrictEquals, describe, it } from "@test_deps";

import * as multiline from "@utils/multiline.ts";

import * as assembler from "./1_main_assembler.ts";

const __directoryPath = path.dirname(path.fromFileUrl(import.meta.url));

const test = describe("Assembler");

describe(test, "Assemble", () => {
  it("can assemble Add.asm", () => {
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
    const expected = multiline.stripIndent`
      0000000000000010
      1110110000010000
      0000000000000011
      1110000010010000
      0000000000000000
      1110001100001000
    `;
    assertStrictEquals(assembler.assemble(sourceCode), expected);
  });

  it("can assemble MaxL.asm", () => {
    const sourceCode = multiline.stripIndent`
      // This file is part of www.nand2tetris.org
      // and the book "The Elements of Computing Systems"
      // by Nisan and Schocken, MIT Press.
      // File name: projects/06/max/MaxL.asm

      // Symbol-less version of the Max.asm program.

      @0
      D=M
      @1
      D=D-M
      @10
      D;JGT
      @1
      D=M
      @12
      0;JMP
      @0
      D=M
      @2
      M=D
      @14
      0;JMP
    `;
    const expected = multiline.stripIndent`
      0000000000000000
      1111110000010000
      0000000000000001
      1111010011010000
      0000000000001010
      1110001100000001
      0000000000000001
      1111110000010000
      0000000000001100
      1110101010000111
      0000000000000000
      1111110000010000
      0000000000000010
      1110001100001000
      0000000000001110
      1110101010000111
    `;
    assertStrictEquals(assembler.assemble(sourceCode), expected);
  });

  it("can assemble rectL.asm", () => {
    const sourceCode = multiline.stripIndent`
      // This file is part of www.nand2tetris.org
      // and the book "The Elements of Computing Systems"
      // by Nisan and Schocken, MIT Press.
      // File name: projects/06/rect/RectL.asm

      // Symbol-less version of the Rect.asm program.

      @0
      D=M
      @23
      D;JLE
      @16
      M=D
      @16384
      D=A
      @17
      M=D
      @17
      A=M
      M=-1
      @17
      D=M
      @32
      D=D+A
      @17
      M=D
      @16
      MD=M-1
      @10
      D;JGT
      @23
      0;JMP
    `;
    const expected = multiline.stripIndent`
      0000000000000000
      1111110000010000
      0000000000010111
      1110001100000110
      0000000000010000
      1110001100001000
      0100000000000000
      1110110000010000
      0000000000010001
      1110001100001000
      0000000000010001
      1111110000100000
      1110111010001000
      0000000000010001
      1111110000010000
      0000000000100000
      1110000010010000
      0000000000010001
      1110001100001000
      0000000000010000
      1111110010011000
      0000000000001010
      1110001100000001
      0000000000010111
      1110101010000111
    `;
    assertStrictEquals(assembler.assemble(sourceCode), expected);
  });

  it("can assemble Max.asm", () => {
    const sourceCode = multiline.stripIndent`
      // This file is part of www.nand2tetris.org
      // and the book "The Elements of Computing Systems"
      // by Nisan and Schocken, MIT Press.
      // File name: projects/06/max/Max.asm

      // Computes R2 = max(R0, R1)  (R0,R1,R2 refer to RAM[0],RAM[1],RAM[2])

         @R0
         D=M              // D = first number
         @R1
         D=D-M            // D = first number - second number
         @OUTPUT_FIRST
         D;JGT            // if D>0 (first is greater) goto output_first
         @R1
         D=M              // D = second number
         @OUTPUT_D
         0;JMP            // goto output_d
      (OUTPUT_FIRST)
         @R0
         D=M              // D = first number
      (OUTPUT_D)
         @R2
         M=D              // M[2] = D (greatest number)
      (INFINITE_LOOP)
         @INFINITE_LOOP
         0;JMP            // infinite loop
    `;

    const expected = multiline.stripIndent`
      0000000000000000
      1111110000010000
      0000000000000001
      1111010011010000
      0000000000001010
      1110001100000001
      0000000000000001
      1111110000010000
      0000000000001100
      1110101010000111
      0000000000000000
      1111110000010000
      0000000000000010
      1110001100001000
      0000000000001110
      1110101010000111
    `;
    assertStrictEquals(assembler.assemble(sourceCode), expected);
  });

  it("can assemble Rect.asm", () => {
    const sourceCode = multiline.stripIndent`
      // This file is part of www.nand2tetris.org
      // and the book "The Elements of Computing Systems"
      // by Nisan and Schocken, MIT Press.
      // File name: projects/06/rect/Rect.asm

      // Draws a rectangle at the top-left corner of the screen.
      // The rectangle is 16 pixels wide and R0 pixels high.

         @0
         D=M
         @INFINITE_LOOP
         D;JLE
         @counter
         M=D
         @SCREEN
         D=A
         @address
         M=D
      (LOOP)
         @address
         A=M
         M=-1
         @address
         D=M
         @32
         D=D+A
         @address
         M=D
         @counter
         MD=M-1
         @LOOP
         D;JGT
      (INFINITE_LOOP)
         @INFINITE_LOOP
         0;JMP
    `;

    const expected = multiline.stripIndent`
      0000000000000000
      1111110000010000
      0000000000010111
      1110001100000110
      0000000000010000
      1110001100001000
      0100000000000000
      1110110000010000
      0000000000010001
      1110001100001000
      0000000000010001
      1111110000100000
      1110111010001000
      0000000000010001
      1111110000010000
      0000000000100000
      1110000010010000
      0000000000010001
      1110001100001000
      0000000000010000
      1111110010011000
      0000000000001010
      1110001100000001
      0000000000010111
      1110101010000111
    `;
    assertStrictEquals(assembler.assemble(sourceCode), expected);
  });

  it("can assemble Pong.asm", async () => {
    const sourceCode = await assembler.readTextFile(
      `${__directoryPath}/test_files/Pong.asm`,
    );

    if (assembler.isReadTextFileError(sourceCode)) {
      throw new Error(JSON.stringify(sourceCode, undefined, 2));
    }

    const expected = await assembler.readTextFile(
      `${__directoryPath}/test_files/Pong.KEEP.hack`,
    );

    if (assembler.isReadTextFileError(expected)) {
      throw new Error(JSON.stringify(expected, undefined, 2));
    }

    assertStrictEquals(assembler.assemble(sourceCode), expected.trim());
  });
});

describe(test, "Files", () => {
  it("Can read from a particular file", async () => {
    const actual = await assembler.readTextFile(
      `${__directoryPath}/test_files/file.txt`,
    );
    assertStrictEquals(actual, "Hello, world!");
  });

  it("Gets an error object when read fails", async () => {
    const actual = await assembler.readTextFile(
      `${__directoryPath}/test_files/file_does_not_exist.txt`,
    );
    assertEquals(actual, {
      attemptedPath:
        "/Users/chooie/code/nand2tetris/projects/06/assembler/src/app/test_files/file_does_not_exist.txt",
      errorMessage: "No such file or directory (os error 2)",
      errorType: "NotFound",
      isError: true,
    });
  });

  it("Can write to a particular file", async () => {
    const actual = await assembler.writeTextFile(
      `${__directoryPath}/test_files/file.generated.txt`,
      "Foo",
    );
    assertStrictEquals(actual, undefined);
  });

  it("Can write and then read a file", async () => {
    const filePath = `${__directoryPath}/test_files/file_write.generated.txt`;
    const timeNow = Date.now();

    await assembler.writeTextFile(filePath, `${timeNow}`);

    const actual = await assembler.readTextFile(filePath);

    assertStrictEquals(actual, `${timeNow}`);
  });
});
