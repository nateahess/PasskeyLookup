export interface AaguidEntry {
  name: string;
  icon_dark?: string;
  icon_light?: string;
}

export type AaguidRegistry = Record<string, AaguidEntry>;

export interface AaguidMeta {
  updatedAt: string;
  count: number;
}
