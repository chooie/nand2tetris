import { assertEquals } from "@utils/asserts.ts";
import { describe, it } from "@utils/bdd.ts";

import * as symbol from "./symbol.ts";

describe("Symbol", () => {
  it("is true", () => {
    assertEquals(symbol.makeSymbolTable(), {});
  });
});
