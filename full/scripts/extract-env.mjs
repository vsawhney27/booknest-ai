// full/scripts/extract-env.mjs
import fs from "fs";
import path from "path";

const ROOT = path.resolve("full");
const exts = new Set([".js", ".mjs", ".cjs", ".ts", ".tsx", ".jsx", ".html", ".css"]);
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".git")) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (exts.has(path.extname(p))) files.push(p);
  }
}
walk(ROOT);

const envPatternA = /process\.env\.([A-Z0-9_]+)/g;       // Node style
const envPatternB = /import\.meta\.env\.([A-Z0-9_]+)/g;   // Vite style
const headerPattern = /(Authorization|X-API-Key|X-Api-Key|apiKey)\s*[:=]/ig;

const found = new Set();
const suspicious = [];

for (const f of files) {
  const txt = fs.readFileSync(f, "utf8");
  let m;
  while ((m = envPatternA.exec(txt))) found.add(m[1]);
  while ((m = envPatternB.exec(txt))) found.add(m[1]);
  if (headerPattern.test(txt)) suspicious.push(f);
}

console.log("Detected env vars in code:", Array.from(found).sort());
if (suspicious.length) {
  console.log("\nFiles that send auth headers (may need keys):");
  for (const f of suspicious) console.log(" -", f);
}

// Write a machine-readable list for the next step
fs.writeFileSync(path.join(ROOT, "scripts", "env-detected.json"),
  JSON.stringify({ vars: Array.from(found).sort(), suspicious }, null, 2)
);
console.log("\nWrote full/scripts/env-detected.json");