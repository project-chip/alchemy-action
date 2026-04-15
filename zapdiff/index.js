const childProcess = require("child_process");
const os = require("os");
const process = require("process");

function runAlchemy() {
  const platform = os.platform();
  const arch = os.arch();
  const executable = `alchemy-action-${platform}-${arch}`;
  const path = `${__dirname}/../${executable}`;
  console.log("Running " + path);
  
  console.log("Environment variables starting with INPUT_:");
  for (const key in process.env) {
    if (key.startsWith('INPUT_')) {
      console.log(`${key}=${process.env[key]}`);
    }
  }
  
  const args = ['zap-diff'];
  if (process.env['INPUT_BASELINE-XML']) {
    args.push('--baseline-xml', process.env['INPUT_BASELINE-XML']);
  }
  if (process.env['INPUT_GENERATED-XML']) {
    args.push('--generated-xml', process.env['INPUT_GENERATED-XML']);
  }
  if (process.env['INPUT_SDK-ROOT']) {
    args.push('--sdk-root', process.env['INPUT_SDK-ROOT']);
  }
  if (process.env['INPUT_SDK-LABEL']) {
    args.push('--sdk-label', process.env['INPUT_SDK-LABEL']);
  }
  if (process.env['INPUT_SPEC-LABEL']) {
    args.push('--spec-label', process.env['INPUT_SPEC-LABEL']);
  }
  if (process.env['INPUT_GEN-ATTRIBUTES']) {
    args.push('--gen-attributes', process.env['INPUT_GEN-ATTRIBUTES']);
  }
  if (process.env['INPUT_SPEC-ROOT']) {
    args.push('--spec-root', process.env['INPUT_SPEC-ROOT']);
  }
  
  const out = childProcess.spawnSync(path, args, { cwd: process.env.GITHUB_WORKSPACE, stdio: 'inherit' });
  process.exit(out.status);
}

console.log("Loaded module.");
if (require.main === module) {
  runAlchemy();
}
