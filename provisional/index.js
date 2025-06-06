const childProcess = require("child_process");
const os = require("os");
const process = require("process");

function runAlchemy() {
  const platform = os.platform();
  const arch = os.arch();
  const executable = `alchemy-action-${platform}-${arch}`;
  const path = `${__dirname}/../${executable}`;
  console.log("Running " + path);
  const out = childProcess.spawnSync(path, ['provisional'], { cwd: `${__dirname}/..`, stdio: 'inherit' });
  process.exit(out.status);
}

console.log("Loaded module.");
if (require.main === module) {
  runAlchemy();
}
