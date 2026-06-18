export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => !(r.length === 1 && r[0] === ""));
}

function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function toCsv(rows: string[][]): string {
  return rows.map((row) => row.map(csvEscape).join(",")).join("\r\n") + "\r\n";
}

// Picks the column most likely to contain AAGUIDs by counting how many
// data rows have a value matching the AAGUID shape (UUID or 32 hex chars).
export function detectAaguidColumn(
  rows: string[][],
  isAaguidLike: (value: string) => boolean,
): number {
  if (rows.length === 0) return -1;

  const columnCount = Math.max(...rows.map((r) => r.length));
  let bestColumn = -1;
  let bestScore = 0;

  for (let col = 0; col < columnCount; col++) {
    const score = rows.reduce(
      (count, row) => count + (isAaguidLike(row[col] ?? "") ? 1 : 0),
      0,
    );
    if (score > bestScore) {
      bestScore = score;
      bestColumn = col;
    }
  }

  return bestScore > 0 ? bestColumn : -1;
}

export function rowLooksLikeHeader(row: string[], isAaguidLike: (value: string) => boolean): boolean {
  return !row.some((cell) => isAaguidLike(cell));
}
