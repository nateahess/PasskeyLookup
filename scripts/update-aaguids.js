import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const UPSTREAM_URL =
  "https://raw.githubusercontent.com/passkeydeveloper/passkey-authenticator-aaguids/main/aaguid.json";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = join(root, "public", "aaguids.json");
const metaPath = join(root, "public", "aaguids-meta.json");

const response = await fetch(UPSTREAM_URL);
if (!response.ok) {
  console.error(`Failed to fetch AAGUID data: ${response.status}`);
  process.exit(1);
}

const data = await response.json();
writeFileSync(outputPath, JSON.stringify(data, null, 2) + "\n");

const count = Object.keys(data).length;
writeFileSync(
  metaPath,
  JSON.stringify({ updatedAt: new Date().toISOString(), count }, null, 2) + "\n",
);

console.log(`Wrote ${outputPath} (${count} entries)`);
