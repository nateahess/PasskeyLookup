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
  "AliasVault": {
    description: "Open-source, self-hostable password and email-alias manager with passkey support.",
    docsUrl: "https://www.aliasvault.net/",
  },
  "Sésame": {
    description: "French password manager for iOS and Mac that added passkey support in Sésame 7.",
    docsUrl: "https://apps.apple.com/app/id1370928630",
  },
  "IDmelon": {
    description: "FIDO2 authenticator app, now part of HID Global, that turns a phone into a roaming, certified FIDO security key.",
    docsUrl: "https://idmelon.com/products/idmelonauth",
  },
  "Thales Bio iOS SDK": {
    description: "Biometric authentication SDK component from Thales's Mobile Protector suite, embedded in banking and enterprise apps for passwordless sign-in.",
    docsUrl: "https://cpl.thalesgroup.com/access-management/digital-banking/mobile-authentication",
  },
  "Thales Bio Android SDK": {
    description: "Biometric authentication SDK component from Thales's Mobile Protector suite, embedded in banking and enterprise apps for passwordless sign-in.",
    docsUrl: "https://cpl.thalesgroup.com/access-management/digital-banking/mobile-authentication",
  },
  "Thales PIN Android SDK": {
    description: "PIN-based authentication SDK component from Thales's Mobile Protector suite, embedded in banking and enterprise apps for passwordless sign-in.",
    docsUrl: "https://cpl.thalesgroup.com/access-management/digital-banking/mobile-authentication",
  },
  "Thales PIN iOS SDK": {
    description: "PIN-based authentication SDK component from Thales's Mobile Protector suite, embedded in banking and enterprise apps for passwordless sign-in.",
    docsUrl: "https://cpl.thalesgroup.com/access-management/digital-banking/mobile-authentication",
  },
  "KeePassPasskey": {
    description: "A third-party passkey provider for the KeePass ecosystem. No canonical project page could be confirmed for this entry.",
  },
  "ToothPic Passkey Provider": {
    description: "Android app from the Italian security firm ToothPic that binds passkeys to a smartphone camera sensor's unique fingerprint instead of standard secure hardware.",
    docsUrl: "https://www.toothpic.eu/passkey-provider/",
  },
  "iPasswords": {
    description: "An entry in the community AAGUID registry; no verifiable public product page was found for this provider.",
  },
  "pwSafe": {
    description: "iOS and Mac client for the classic open-source Password Safe (.psafe3) format, with added passkey and AutoFill support.",
    docsUrl: "https://pwsafe.app/",
  },
  "initial": {
    description: "An unclear, unlabeled entry in the upstream community registry; no identifiable public product could be found behind it.",
  },
  "Heimlane Vault": {
    description: "Zero-knowledge, Bitwarden-compatible business password manager hosted in France and Germany, with passkey support.",
    docsUrl: "https://heimlane.com/products/vault/",
  },
  "Sherlocked": {
    description: "Apple-exclusive password and passkey manager for iOS and Mac that stores its vault in the user's own iCloud account.",
    docsUrl: "https://www.sherlockedapp.com/",
  },
  "Passwall": {
    description: "Open-source, self-hosted password manager.",
    docsUrl: "https://passwall.io/",
  },
  "Burp Suite Navigation Recorder": {
    description: "Not a consumer passkey provider — a PortSwigger Burp Suite browser extension for recording login/navigation sequences, including WebAuthn passkey captures, for automated security scanning.",
    docsUrl: "https://portswigger.net/burp/documentation/scanner/authenticated-scanning/using-recorded-logins",
  },
  "YubiKey 5 Series": {
    description: "Yubico's multi-protocol USB/NFC hardware security key line, supporting FIDO2 passkeys alongside U2F, PIV, OpenPGP, and OTP.",
    docsUrl: "https://www.yubico.com/products/yubikey-5-overview/",
  },
  "YubiKey 5 Series FIPS": {
    description: "FIPS 140-2 validated variant of the YubiKey 5 Series, for government and regulated environments.",
    docsUrl: "https://www.yubico.com/products/yubikey-5-overview/",
  },
  "YubiKey 5 NFC / 5C NFC": {
    description: "YubiKey 5 Series hardware security keys with NFC for tap-to-authenticate on supported phones and readers.",
    docsUrl: "https://www.yubico.com/products/yubikey-5-overview/",
  },
  "YubiKey 5 NFC / 5C NFC FIPS": {
    description: "FIPS 140-2 validated variant of the YubiKey 5 NFC / 5C NFC.",
    docsUrl: "https://www.yubico.com/products/yubikey-5-overview/",
  },
  "YubiKey 5 NFC / 5C NFC ePIN": {
    description: "YubiKey 5 NFC / 5C NFC variant with enhanced PIN complexity policy enforcement.",
    docsUrl: "https://www.yubico.com/products/yubikey-5-overview/",
  },
  "YubiKey 5Ci": {
    description: "YubiKey 5 Series key with both USB-C and Lightning connectors, for use across computers and iOS devices.",
    docsUrl: "https://www.yubico.com/product/yubikey-5ci/",
  },
  "YubiKey 5Ci FIPS": {
    description: "FIPS 140-2 validated variant of the YubiKey 5Ci.",
    docsUrl: "https://www.yubico.com/product/yubikey-5ci/",
  },
  "YubiKey Bio": {
    description: "Yubico hardware security key with a built-in fingerprint sensor for biometric passkey sign-in.",
    docsUrl: "https://www.yubico.com/products/yubikey-bio-series/",
  },
  "YubiKey Bio Multi-protocol Edition": {
    description: "YubiKey Bio variant that adds PIV and OpenPGP support alongside biometric FIDO2 passkey sign-in.",
    docsUrl: "https://www.yubico.com/products/yubikey-bio-series/",
  },
  "YubiKey Security Key": {
    description: "Yubico's entry-level USB security key, focused on FIDO2/FIDO U2F only.",
    docsUrl: "https://www.yubico.com/products/security-key/",
  },
  "YubiKey Security Key NFC": {
    description: "Yubico's entry-level USB/NFC security key, focused on FIDO2/FIDO U2F only.",
    docsUrl: "https://www.yubico.com/products/security-key/",
  },
  "YubiKey Security Key NFC Enterprise Edition": {
    description: "Enterprise-managed variant of the Security Key NFC, with a unique serial number and configuration options for large-scale deployment.",
    docsUrl: "https://www.yubico.com/products/security-key/",
  },
};
