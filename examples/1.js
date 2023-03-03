import fs from "fs";
import async_hooks from "async_hooks";
import { performance } from 'perf_hooks';
 
// Sync write to the console
const writeSomething = (phase, more) => {
  fs.writeSync(
    1,
    `Phase: "${phase}", Exec. Id: ${async_hooks.executionAsyncId()} ${
      more ? ", " + more : ""
    }\n`
  );
};

let start;
let end;
 
// Create and enable the hook
const timeoutHook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    if (asyncId !== 7) {
      return;
    }

    start = performance.now();

    writeSomething(
      "Init",
      `asyncId: ${asyncId}, type: "${type}", triggerAsyncId: ${triggerAsyncId}`
    );
  },
  before(asyncId) {
    if (asyncId !== 7) {
      return;
    }

    writeSomething("Before", `asyncId: ${asyncId}`);
  },
  destroy(asyncId) {
    if (asyncId !== 7) {
      return;
    }

    end = performance.now();
    console.log(end - start);

    writeSomething("Destroy", `asyncId: ${asyncId}`);
  },
  after(asyncId) {
    if (asyncId !== 7) {
      return;
    }

    writeSomething("After", `asyncId: ${asyncId}`);
  },
});
timeoutHook.enable();
 
writeSomething("Before call");
 
// Set the timeout
setTimeout(() => {
  // Сколько сама функция выполняется
  writeSomething("Exec. Timeout");
}, 1000); // Сколько ожидание между стартом и концом
