#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, realpathSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT = "rosepetal-boutique-live";
const REMOTE = "maniraj";
const REPOSITORY = "https://github.com/Maniraj-chindam/rospetalwebsite.git";
const PAGES = ["/", "/about", "/returns", "/terms"];
const root = realpathSync(join(fileURLToPath(import.meta.url), "../.."));
const checkOnly = process.argv.includes("--check");

if (process.argv.slice(2).some((arg) => arg !== "--check")) {
  throw new Error("Usage: node scripts/deploy-hosting.mjs [--check]");
}

function run(command, args, options = {}) {
  const result = execFileSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: options.stdio ?? "pipe",
  });
  return typeof result === "string" ? result.trim() : "";
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function hasCommand(command) {
  return spawnSync(command, ["--version"], { stdio: "ignore" }).status === 0;
}

function verifySource() {
  assert(run("git", ["branch", "--show-current"]) === "main", "Deploy only from main.");
  assert(run("git", ["status", "--porcelain"]) === "", "Commit all website changes before deploying.");
  assert(run("git", ["remote", "get-url", REMOTE]) === REPOSITORY, "The maniraj remote is not the authorized website repository.");

  const head = run("git", ["rev-parse", "HEAD"]);
  const remoteHead = run("git", ["ls-remote", REMOTE, "refs/heads/main"]).split(/\s+/)[0];
  assert(head === remoteHead, "Local HEAD differs from maniraj/main. Fetch, reconcile, and push before deploying.");

  const firebaseProject = JSON.parse(readFileSync(join(root, ".firebaserc"), "utf8")).projects?.default;
  const hostingRoot = JSON.parse(readFileSync(join(root, "firebase.json"), "utf8")).hosting?.public;
  assert(firebaseProject === PROJECT && hostingRoot === "out", "Firebase project or hosting output differs from the approved configuration.");
  return head;
}

async function verifyLive() {
  for (const domain of ["rosepetalboutique.com", `${PROJECT}.web.app`]) {
    for (const page of PAGES) {
      const file = page === "/" ? "index.html" : `${page.slice(1)}.html`;
      const expected = createHash("sha256").update(readFileSync(join(root, "out", file))).digest("hex");
      let matched = false;

      for (let attempt = 0; attempt < 10; attempt += 1) {
        try {
          const response = await fetch(`https://${domain}${page}?release=${Date.now()}`, { cache: "no-store" });
          if (response.ok) {
            const actual = createHash("sha256").update(Buffer.from(await response.arrayBuffer())).digest("hex");
            if (actual === expected) {
              matched = true;
              break;
            }
          }
        } catch {
          // Allow a short network interruption before declaring a failed release.
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      assert(matched, `Live ${domain}${page} does not match this build. Check Hosting release history before reporting success.`);
      console.log(`Verified https://${domain}${page}`);
    }
  }
}

try {
  const head = verifySource();
  console.log(`Approved source: ${REMOTE}/main ${head}`);

  const manager = hasCommand("npm") ? "npm" : hasCommand("pnpm") ? "pnpm" : null;
  assert(manager, "Install npm or pnpm to run the release checks.");
  for (const task of ["lint", "test", "build", "check:export"]) {
    run(manager, ["run", task], { stdio: "inherit" });
  }
  verifySource();

  if (checkOnly) {
    console.log("Release checks passed. Hosting was not changed.");
  } else {
    const firebase = manager === "npm" ? ["npx", ["--yes", "firebase-tools"]] : ["pnpm", ["dlx", "firebase-tools"]];
    run(firebase[0], [...firebase[1], "deploy", "--only", "hosting", "--project", PROJECT, "--non-interactive"], { stdio: "inherit" });
    await verifyLive();
    console.log(`Verified Hosting release from ${head}.`);
  }
} catch (error) {
  console.error(`Hosting release stopped: ${error.message}`);
  process.exitCode = 1;
}
