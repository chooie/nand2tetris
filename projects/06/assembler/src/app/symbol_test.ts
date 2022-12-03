import { assertThrows, assertEquals } from "@utils/asserts.ts";
import { describe, it } from "@utils/bdd.ts";

import * as symbol from "./symbol.ts";

describe("Symbol", () => {
  it("makes a symbol table", () => {
    assertEquals(
      symbol.makeSymbolTable().symbolTable,
      symbol.PREDEFINED_SYMBOL_TABLE,
    );
  });

  it("can check if symbol table contains a symbol", () => {
    const symbolTable = symbol.makeSymbolTable();

    assertEquals(symbolTable.doesContain("SCREEN"), true);
    assertEquals(symbolTable.doesContain("FOOBAR"), false);
  });

  it("can add a new symbol", () => {
    const symbolTable = symbol.makeSymbolTable();
    symbolTable.add("FOOBAR", 123);

    assertEquals(symbolTable.doesContain("FOOBAR"), true);
    assertThrows<Error>(
      () => {
        symbolTable.add("SCREEN", 123);
      },
      Error,
      "Symbol already exists",
    );
  });

  it("can get the address of a symbol that exists", () => {
    const symbolTable = symbol.makeSymbolTable();
    symbolTable.add("FOOBAR", 123);
    symbolTable.add("SOME_SYMBOL", 123);

    assertEquals(symbolTable.getSymbolAddress("SCREEN"), 16384);
    assertEquals(symbolTable.getSymbolAddress("FOOBAR"), 123);
    assertEquals(symbolTable.getSymbolAddress("SOME_SYMBOL"), 123);
  });

  it("automatically makes an instruction for a symbol that doesn't exist", () => {
    const symbolTable = symbol.makeSymbolTable();
    assertEquals(symbolTable.getSymbolAddress("DOES_NOT_EXIST"), 16);
  });
});
