const watcher = Deno.watchFs("./src");
console.log("Watching repo for changes...");

let canRun = true;

run();

for await (const _event of watcher) {
  // _debug(_event)

  if (canRun) {
    canRun = false;
    await run();
    // We need to prevent subsequent tasks from running. For some reason,
    // 3 events seems to trigger every time I save
    setTimeout(() => {
      canRun = true;
    }, 1000);
  }
}

async function run() {
  const process = Deno.run({ cmd: ["deno", "task", "check-all"] });
  const status = await process.status();
  const { success } = status;
  if (!success) {
    console.error("🔴 ERROR 🔴");
  } else {
    console.log("✅ SUCCESS ✅");
  }
  console.error(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
}

function _debug(event: Deno.FsEvent) {
  console.log(">>>> File system event");
  console.log(event);
  // Example event: { kind: "create", paths: [ "/home/alice/deno/foo.txt" ] }
}
