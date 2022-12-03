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

    assertEquals(symbolTable.doesContain("LOOP"), true);
    assertEquals(symbolTable.doesContain("FOOBAR"), false);
  });

  it("can add a new symbol", () => {
    const symbolTable = symbol.makeSymbolTable();
    symbolTable.add("FOOBAR", 123);

    assertEquals(symbolTable.doesContain("FOOBAR"), true);
    assertThrows<Error>(
      () => {
        symbolTable.add("LOOP", 123);
      },
      Error,
      "Symbol already exists",
    );
  });

  it("can get the address of a symbol", () => {
    const symbolTable = symbol.makeSymbolTable();
    symbolTable.add("FOOBAR", 123);
    symbolTable.add("SOME_SYMBOL", 123);

    assertEquals(symbolTable.getSymbolAddress("LOOP"), 4);
    assertEquals(symbolTable.getSymbolAddress("FOOBAR"), 123);
    assertEquals(symbolTable.getSymbolAddress("SOME_SYMBOL"), 123);
  });
});
