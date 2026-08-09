import { existsSync, readFileSync } from "node:fs";
import { resolve, sep } from "node:path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const normalizedBase = `/${basePath.replace(/^\/+|\/+$/g, "")}`;
const clientRoot = resolve("dist/client");
const htmlPath = resolve(clientRoot, "index.html");
const html = readFileSync(htmlPath, "utf8");
const localUrls = [...html.matchAll(/(?:src|href)="([^"#?]+)"/g)]
  .map((match) => match[1])
  .filter((url) => url.startsWith(`${normalizedBase}/`));

const missing = [];
for (const url of new Set(localUrls)) {
  const relativePath = decodeURIComponent(url.slice(normalizedBase.length + 1));
  const filePath = resolve(clientRoot, relativePath);
  if (!filePath.startsWith(`${clientRoot}${sep}`) || !existsSync(filePath)) {
    missing.push(url);
  }
}

const privateDocuments = [
  "booking-confirmation.pdf",
  "booking-notes.pdf",
  "itinerary.pdf",
  "payment-statement.pdf",
];
const exposedDocuments = privateDocuments.filter((name) =>
  existsSync(resolve(clientRoot, "docs", name)),
);

if (missing.length > 0) {
  throw new Error(`Missing GitHub Pages assets:\n${missing.join("\n")}`);
}
if (exposedDocuments.length > 0 && process.env.ALLOW_LOCAL_PRIVATE_DOCS !== "1") {
  throw new Error(`Private documents must not be deployed:\n${exposedDocuments.join("\n")}`);
}

console.log(`Validated ${new Set(localUrls).size} GitHub Pages asset paths.`);
