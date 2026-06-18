(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function i(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(r){if(r.ep)return;r.ep=!0;const s=i(r);fetch(r.href,s)}})();const y=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function f(e){const t=e.trim().toLowerCase();if(y.test(t))return t;const i=t.replace(/[^a-f0-9]/g,"");return i.length!==32?null:`${i.slice(0,8)}-${i.slice(8,12)}-${i.slice(12,16)}-${i.slice(16,20)}-${i.slice(20)}`}function b(e,t){return e[t]??null}function w(e){return Object.keys(e).length===0}function k(e,t){const i=f(t),l=t.trim().toLowerCase(),r=Object.entries(e).map(([s,n])=>({aaguid:s,entry:n}));return l?r.filter(({aaguid:s,entry:n})=>s.includes(l)||n.name.toLowerCase().includes(l)||i!==null&&s===i).sort((s,n)=>s.entry.name.localeCompare(n.entry.name)):r.sort((s,n)=>s.entry.name.localeCompare(n.entry.name))}function A(e,t){return t?e.icon_dark??e.icon_light:e.icon_light??e.icon_dark}const I="00000000-0000-0000-0000-000000000000",L='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>';function U(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function h(e){const t=e?A(e,U()):void 0;return t?`<img src="${t}" alt="" />`:L}function E(e,t,i=!1){const l=(t==null?void 0:t.name)??"Unknown provider";return`
    <div class="${i||!t?"result-card unknown":"result-card"}">
      <div class="result-icon">${h(t)}</div>
      <div class="result-body">
        <p class="result-name">${u(l)}</p>
        <p class="result-aaguid">${u(e)}</p>
      </div>
    </div>
  `}function $(e,t){return`
    <li class="browse-item" data-aaguid="${u(e)}" tabindex="0">
      <div class="browse-icon">${h(t)}</div>
      <div class="browse-body">
        <div class="browse-name">${u(t.name)}</div>
        <div class="browse-aaguid">${u(e)}</div>
      </div>
    </li>
  `}function u(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}async function D(){const e=await fetch("./aaguids.json");if(!e.ok)throw new Error(`Failed to load AAGUID data (${e.status})`);return e.json()}function C(e){const t=document.getElementById("app");if(!t)return;const i=w(e),l=Object.keys(e).length;t.innerHTML=`
    <div class="layout">
      <header>
        <h1>Passkey AAGUID Lookup</h1>
        <p class="subtitle">Match authenticator AAGUIDs to passkey providers and apps.</p>
      </header>

      ${i?'<div class="warning-banner">The AAGUID registry is empty. The upstream community list may have been retired. Run <code>npm run update-data</code> or check the data source.</div>':""}

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
        <h2>All providers (${l})</h2>
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
  `;const r=document.getElementById("aaguid-search"),s=document.getElementById("result-container"),n=document.getElementById("browse-list");function p(o){const c=o.trim();if(!c){s.innerHTML='<p class="result-empty">Enter an AAGUID above to look up its provider.</p>';return}const a=f(c);if(!a){s.innerHTML='<p class="result-empty">Invalid AAGUID format. Use a UUID or 32 hex characters.</p>';return}const m=b(e,a),v=!m||a===I;s.innerHTML=E(a,m,v)}function d(o){const c=k(e,o);if(c.length===0){n.innerHTML='<li class="browse-empty">No providers match your search.</li>';return}n.innerHTML=c.map(({aaguid:a,entry:m})=>$(a,m)).join("")}function g(){const o=r.value;p(o),d(o)}r.addEventListener("input",()=>{const o=r.value;p(o),d(o)}),n.addEventListener("click",o=>{const c=o.target.closest(".browse-item");if(!c)return;const a=c.getAttribute("data-aaguid");a&&(r.value=a,p(a),d(a),r.focus())}),n.addEventListener("keydown",o=>{if(o.key!=="Enter"&&o.key!==" ")return;const c=o.target.closest(".browse-item");if(!c)return;o.preventDefault();const a=c.getAttribute("data-aaguid");a&&(r.value=a,p(a),d(a),r.focus())}),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",g),d("")}async function M(){const e=document.getElementById("app");if(e)try{const t=await D();C(t)}catch(t){e.innerHTML=`
      <div class="layout">
        <header>
          <h1>Passkey AAGUID Lookup</h1>
        </header>
        <div class="warning-banner">
          Failed to load AAGUID data: ${u(t instanceof Error?t.message:String(t))}
        </div>
      </div>
    `}}M();
