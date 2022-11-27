import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

Deno.test("Assembler", async (t) => {
  await t.step("is true", () => {
    assertEquals(true, true);
  });
  await t.step("is false", () => {
    assertEquals(false, false);
  });
  await t.step("can do async checks", async () => {
    const result = await new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve("returns");
      }, 20);
    });
    assertEquals(result, "returns");
  });
});
