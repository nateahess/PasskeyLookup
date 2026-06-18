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

export interface RegistryRow {
  aaguid: string;
  entry: AaguidEntry;
}

export function listEntries(registry: AaguidRegistry): RegistryRow[] {
  return Object.entries(registry)
    .map(([aaguid, entry]) => ({ aaguid, entry }))
    .sort((a, b) => a.entry.name.localeCompare(b.entry.name));
}

export function filterEntries(rows: RegistryRow[], query: string): RegistryRow[] {
  const q = query.trim().toLowerCase();
  if (!q) return rows;

  return rows.filter(
    ({ aaguid, entry }) =>
      aaguid.includes(q) || entry.name.toLowerCase().includes(q),
  );
}

export function pickIcon(entry: AaguidEntry, prefersDark: boolean): string | undefined {
  return prefersDark
    ? entry.icon_dark ?? entry.icon_light
    : entry.icon_light ?? entry.icon_dark;
}

export function resolveProviderName(
  registry: AaguidRegistry,
  rawValue: string,
): string {
  const normalized = normalizeAaguid(rawValue);
  if (!normalized) return "";
  return lookupAaguid(registry, normalized)?.name ?? "Unknown";
}
