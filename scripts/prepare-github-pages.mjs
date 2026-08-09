import { existsSync, renameSync, rmdirSync } from "node:fs";
import { resolve, sep } from "node:path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const prefix = basePath.replace(/^\/+|\/+$/g, "");

if (!prefix) {
  throw new Error("NEXT_PUBLIC_BASE_PATH must name the GitHub Pages repository path.");
}

const clientRoot = resolve("dist/client");
const prefixedRoot = resolve(clientRoot, prefix);
const source = resolve(prefixedRoot, "_next");
const target = resolve(clientRoot, "_next");

if (!source.startsWith(`${clientRoot}${sep}`) || !target.startsWith(`${clientRoot}${sep}`)) {
  throw new Error("Refusing to move assets outside dist/client.");
}
if (!existsSync(source)) {
  throw new Error(`Expected generated assets at ${source}.`);
}
if (existsSync(target)) {
  throw new Error(`Unexpected existing target at ${target}. Run a clean build first.`);
}

renameSync(source, target);
rmdirSync(prefixedRoot);
