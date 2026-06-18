import "./style.css";
import {
  filterEntries,
  isRegistryEmpty,
  lookupAaguid,
  normalizeAaguid,
  pickIcon,
} from "./lookup";
import type { AaguidEntry, AaguidRegistry } from "./types";

const UNKNOWN_AAGUID = "00000000-0000-0000-0000-000000000000";
const DEFAULT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>`;

function prefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function iconHtml(entry: AaguidEntry | null): string {
  const src = entry ? pickIcon(entry, prefersDark()) : undefined;
  if (src) {
    return `<img src="${src}" alt="" />`;
  }
  return DEFAULT_ICON;
}

function resultCardHtml(
  aaguid: string,
  entry: AaguidEntry | null,
  unknown = false,
): string {
  const name = entry?.name ?? "Unknown provider";
  const cardClass = unknown || !entry ? "result-card unknown" : "result-card";

  return `
    <div class="${cardClass}">
      <div class="result-icon">${iconHtml(entry)}</div>
      <div class="result-body">
        <p class="result-name">${escapeHtml(name)}</p>
        <p class="result-aaguid">${escapeHtml(aaguid)}</p>
      </div>
    </div>
  `;
}

function browseItemHtml(aaguid: string, entry: AaguidEntry): string {
  return `
    <li class="browse-item" data-aaguid="${escapeHtml(aaguid)}" tabindex="0">
      <div class="browse-icon">${iconHtml(entry)}</div>
      <div class="browse-body">
        <div class="browse-name">${escapeHtml(entry.name)}</div>
        <div class="browse-aaguid">${escapeHtml(aaguid)}</div>
      </div>
    </li>
  `;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function loadRegistry(): Promise<AaguidRegistry> {
  const response = await fetch("./aaguids.json");
  if (!response.ok) {
    throw new Error(`Failed to load AAGUID data (${response.status})`);
  }
  return response.json();
}

function mountApp(registry: AaguidRegistry): void {
  const app = document.getElementById("app");
  if (!app) return;

  const registryEmpty = isRegistryEmpty(registry);
  const entryCount = Object.keys(registry).length;

  app.innerHTML = `
    <div class="layout">
      <header>
        <h1>Passkey AAGUID Lookup</h1>
        <p class="subtitle">Match authenticator AAGUIDs to passkey providers and apps.</p>
      </header>

      ${
        registryEmpty
          ? `<div class="warning-banner">The AAGUID registry is empty. The upstream community list may have been retired. Run <code>npm run update-data</code> or check the data source.</div>`
          : ""
      }

      <div class="search-wrap">
        <label class="search-label" for="aaguid-search">AAGUID</label>
        <input
          id="aaguid-search"
          class="search-input"
          type="text"
          placeholder="ea9b8d66-4d01-1d21-3ce4-b6b48cb575d4"
          spellcheck="false"
          autocomplete="off"
        />
      </div>

      <section class="result-section" aria-live="polite">
        <h2>Result</h2>
        <div id="result-container">
          <p class="result-empty">Enter an AAGUID above to look up its provider.</p>
        </div>
      </section>

      <section class="browse-section">
        <h2>All providers (${entryCount})</h2>
        <ul id="browse-list" class="browse-list"></ul>
      </section>

      <footer>
        <p>
          Data from the community
          <a href="https://github.com/passkeydeveloper/passkey-authenticator-aaguids" target="_blank" rel="noopener noreferrer">passkey-authenticator-aaguids</a>
          registry. For UI labeling only — not for security decisions.
          See <a href="https://web.dev/articles/webauthn-aaguid" target="_blank" rel="noopener noreferrer">web.dev</a>.
        </p>
      </footer>
    </div>
  `;

  const searchInput = document.getElementById("aaguid-search") as HTMLInputElement;
  const resultContainer = document.getElementById("result-container")!;
  const browseList = document.getElementById("browse-list")!;

  function updateResult(query: string): void {
    const trimmed = query.trim();
    if (!trimmed) {
      resultContainer.innerHTML =
        `<p class="result-empty">Enter an AAGUID above to look up its provider.</p>`;
      return;
    }

    const normalized = normalizeAaguid(trimmed);
    if (!normalized) {
      resultContainer.innerHTML =
        `<p class="result-empty">Invalid AAGUID format. Use a UUID or 32 hex characters.</p>`;
      return;
    }

    const entry = lookupAaguid(registry, normalized);
    const isUnknown =
      !entry || normalized === UNKNOWN_AAGUID;
    resultContainer.innerHTML = resultCardHtml(normalized, entry, isUnknown);
  }

  function updateBrowse(query: string): void {
    const items = filterEntries(registry, query);
    if (items.length === 0) {
      browseList.innerHTML =
        `<li class="browse-empty">No providers match your search.</li>`;
      return;
    }

    browseList.innerHTML = items
      .map(({ aaguid, entry }) => browseItemHtml(aaguid, entry))
      .join("");
  }

  function refreshIcons(): void {
    const query = searchInput.value;
    updateResult(query);
    updateBrowse(query);
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    updateResult(query);
    updateBrowse(query);
  });

  browseList.addEventListener("click", (event) => {
    const item = (event.target as Element).closest(".browse-item");
    if (!item) return;
    const aaguid = item.getAttribute("data-aaguid");
    if (!aaguid) return;
    searchInput.value = aaguid;
    updateResult(aaguid);
    updateBrowse(aaguid);
    searchInput.focus();
  });

  browseList.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const item = (event.target as Element).closest(".browse-item");
    if (!item) return;
    event.preventDefault();
    const aaguid = item.getAttribute("data-aaguid");
    if (!aaguid) return;
    searchInput.value = aaguid;
    updateResult(aaguid);
    updateBrowse(aaguid);
    searchInput.focus();
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
    "change",
    refreshIcons,
  );

  updateBrowse("");
}

async function main(): Promise<void> {
  const app = document.getElementById("app");
  if (!app) return;

  try {
    const registry = await loadRegistry();
    mountApp(registry);
  } catch (error) {
    app.innerHTML = `
      <div class="layout">
        <header>
          <h1>Passkey AAGUID Lookup</h1>
        </header>
        <div class="warning-banner">
          Failed to load AAGUID data: ${escapeHtml(
            error instanceof Error ? error.message : String(error),
          )}
        </div>
      </div>
    `;
  }
}

main();
