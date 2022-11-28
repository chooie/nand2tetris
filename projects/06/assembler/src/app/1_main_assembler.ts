// File name is prefixed with 1_ so it is at the top

console.log(run());

export function run() {
  return "Hello, world";
}

export async function readTextFile(absolutePath: string) {
  return await Deno.readTextFile(absolutePath);
}
