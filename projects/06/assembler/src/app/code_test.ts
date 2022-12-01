import { assertEquals, assertStrictEquals } from "./utilities/asserts.ts";
import { describe, it } from "./utilities/bdd.ts";

describe("Code", () => {
  it("does nothing", () => {
    assertEquals(true, false);
    assertStrictEquals(true, false);
  });
});
