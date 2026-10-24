import { access, readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve("out");

async function pages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? pages(path) : Promise.resolve(entry.name.endsWith(".html") ? [path] : []);
  }));
  return nested.flat();
}

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

const htmlPages = await pages(root);
const missing = new Set();
const localPaths = new Set();
for (const page of htmlPages) {
  const html = await readFile(page, "utf8");
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    if (!match[1].startsWith("/") || match[1].startsWith("//")) continue;
    const pathname = decodeURIComponent(new URL(match[1], "https://rosepetalboutique.com").pathname);
    localPaths.add(pathname);
    const relative = pathname.replace(/^\/+/, "");
    const target = join(root, relative);
    if (!(await exists(target)) && !(await exists(`${target}.html`)) && !(await exists(join(target, "index.html")))) {
      missing.add(`${page}: ${pathname}`);
    }
  }
}

for (const route of ["/", "/collections", "/product", "/contact", "/privacy", "/shipping", "/returns", "/terms", "/robots.txt", "/sitemap.xml"]) {
  const target = join(root, route.replace(/^\/+/, ""));
  if (!(await exists(target)) && !(await exists(`${target}.html`)) && !(await exists(join(target, "index.html")))) missing.add(route);
}

if (missing.size) {
  console.error(`Missing exported routes or assets:\n${[...missing].join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Export check passed: ${htmlPages.length} HTML pages and ${localPaths.size} local links/assets.`);
}
