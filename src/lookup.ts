import type { AaguidEntry, AaguidRegistry } from "./types";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export function normalizeAaguid(input: string): string | null {
  const trimmed = input.trim().toLowerCase();
  if (UUID_RE.test(trimmed)) {
    return trimmed;
  }

  const hex = trimmed.replace(/[^a-f0-9]/g, "");
  if (hex.length !== 32) {
    return null;
  }

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function lookupAaguid(
  registry: AaguidRegistry,
  aaguid: string,
): AaguidEntry | null {
  return registry[aaguid] ?? null;
}

export function isRegistryEmpty(registry: AaguidRegistry): boolean {
  return Object.keys(registry).length === 0;
}

export function filterEntries(
  registry: AaguidRegistry,
  query: string,
): Array<{ aaguid: string; entry: AaguidEntry }> {
  const normalized = normalizeAaguid(query);
  const q = query.trim().toLowerCase();

  const entries = Object.entries(registry).map(([aaguid, entry]) => ({
    aaguid,
    entry,
  }));

  if (!q) {
    return entries.sort((a, b) => a.entry.name.localeCompare(b.entry.name));
  }

  return entries
    .filter(
      ({ aaguid, entry }) =>
        aaguid.includes(q) ||
        entry.name.toLowerCase().includes(q) ||
        (normalized !== null && aaguid === normalized),
    )
    .sort((a, b) => a.entry.name.localeCompare(b.entry.name));
}

export function pickIcon(
  entry: AaguidEntry,
  prefersDark: boolean,
): string | undefined {
  if (prefersDark) {
    return entry.icon_dark ?? entry.icon_light;
  }
  return entry.icon_light ?? entry.icon_dark;
}
