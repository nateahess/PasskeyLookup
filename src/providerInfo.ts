export interface ProviderInfo {
  description: string;
  docsUrl?: string;
}

// Curated by provider name (matches the `name` field in aaguids.json).
// Not every registry entry has a known docs link — that's expected.
export const PROVIDER_INFO: Record<string, ProviderInfo> = {
  "Google Password Manager": {
    description: "Google's built-in credential manager, syncing passkeys across Chrome and Android devices.",
    docsUrl: "https://support.google.com/accounts/answer/13548313",
  },
  "Chrome on Mac": {
    description: "Passkeys created and synced through Chrome's built-in credential manager on macOS.",
    docsUrl: "https://support.google.com/chrome/answer/13168025",
  },
  "Chromium Browser": {
    description: "Passkeys created through Chromium's built-in WebAuthn platform authenticator.",
  },
  "Windows Hello": {
    description: "Microsoft's platform authenticator for Windows, using PIN, fingerprint, or facial recognition.",
    docsUrl: "https://support.microsoft.com/windows/passkeys-in-windows",
  },
  "Microsoft Password Manager": {
    description: "Passkeys saved to a Microsoft account via Edge or the Microsoft Authenticator app.",
    docsUrl: "https://support.microsoft.com/account-billing/passkeys-in-microsoft-accounts",
  },
  "Edge on Mac": {
    description: "Passkeys created and synced through Microsoft Edge's credential manager on macOS.",
  },
  "iCloud Keychain (Managed)": {
    description: "Apple's iCloud Keychain, syncing passkeys across Apple devices signed into the same Apple ID.",
    docsUrl: "https://support.apple.com/en-us/102195",
  },
  "Apple Passwords": {
    description: "Apple's dedicated Passwords app (iOS 18 / macOS Sequoia and later), backed by iCloud Keychain.",
    docsUrl: "https://support.apple.com/en-us/120758",
  },
  "Dashlane": {
    description: "Password manager and passkey provider with browser extensions and mobile apps.",
    docsUrl: "https://support.dashlane.com/hc/en-us/articles/15076418465938",
  },
  "1Password": {
    description: "Password manager and passkey provider available as a browser extension and standalone app.",
    docsUrl: "https://support.1password.com/passkeys/",
  },
  "NordPass": {
    description: "Password manager from Nord Security with passkey storage and syncing.",
    docsUrl: "https://support.nordpass.com/hc/en-us/articles/19402539617073",
  },
  "Keeper": {
    description: "Enterprise-focused password manager with passkey support.",
    docsUrl: "https://docs.keeper.io/en/v/guides/passkeys",
  },
  "Enpass": {
    description: "Offline-first password manager with passkey support.",
    docsUrl: "https://www.enpass.io/docs/passkeys/",
  },
  "Bitwarden": {
    description: "Open-source password manager with passkey storage and syncing.",
    docsUrl: "https://bitwarden.com/help/passkeys/",
  },
  "Samsung Pass": {
    description: "Samsung's built-in credential manager for Galaxy devices.",
    docsUrl: "https://www.samsung.com/us/support/answer/ANS00088095/",
  },
  "Proton Pass": {
    description: "Password manager from Proton with end-to-end encrypted passkey storage.",
    docsUrl: "https://proton.me/support/pass-passkeys",
  },
  "KeePassXC": {
    description: "Open-source, offline password manager and passkey provider for desktop.",
    docsUrl: "https://keepassxc.org/docs/",
  },
  "KeePassDX": {
    description: "Open-source KeePass-compatible password manager for Android.",
  },
  "Zoho Vault": {
    description: "Zoho's enterprise password manager with passkey support.",
    docsUrl: "https://www.zoho.com/vault/help/passkeys.html",
  },
  "LastPass": {
    description: "Password manager with passkey storage and syncing.",
    docsUrl: "https://support.lastpass.com/help/what-are-passkeys",
  },
  "Devolutions": {
    description: "Password and credential management for IT/enterprise from Devolutions.",
  },
  "LogMeOnce": {
    description: "Password manager with passkey and biometric authentication support.",
  },
  "Kaspersky Password Manager": {
    description: "Password manager from Kaspersky with passkey support.",
  },
  "Norton Password Manager": {
    description: "Password manager bundled with Norton security products.",
  },
  "Avast Password Manager": {
    description: "Password manager from Avast with passkey support.",
  },
  "Avira Password Manager": {
    description: "Password manager from Avira with passkey support.",
  },
  "AVG Password Manager": {
    description: "Password manager from AVG with passkey support.",
  },
  "Sticky Password Manager": {
    description: "Cross-platform password manager with passkey support.",
  },
};
