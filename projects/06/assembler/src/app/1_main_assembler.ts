// File name is prefixed with 1_ so it is at the top

export async function readTextFile(absolutePath: string) {
  try {
    return await Deno.readTextFile(absolutePath);
  } catch (error) {
    // if (error instanceof Deno.errors.NotFound) {
    return {
      isError: true,
      errorType: error.name,
      errorMessage: error.message,
      attemptedPath: absolutePath,
    };
  }
}

export async function writeTextFile(absolutePath: string, content: string) {
  return await Deno.writeTextFile(absolutePath, content);
}
