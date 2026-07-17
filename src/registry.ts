import type { AaguidMeta, AaguidRegistry } from "./types";
import { HARDWARE_KEY_REGISTRY } from "./hardwareKeys";

export async function loadRegistry(): Promise<AaguidRegistry> {
  const response = await fetch("./aaguids.json");
  if (!response.ok) {
    throw new Error(`Failed to load AAGUID data (${response.status})`);
  }
  const upstream: AaguidRegistry = await response.json();
  return { ...upstream, ...HARDWARE_KEY_REGISTRY };
}

export async function loadMeta(): Promise<AaguidMeta | null> {
  try {
    const response = await fetch("./aaguids-meta.json");
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}
