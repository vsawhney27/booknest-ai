// full/scripts/make-env-example.mjs
import fs from "fs";
import path from "path";

const ROOT = path.resolve("full");
const detectedPath = path.join(ROOT, "scripts", "env-detected.json");
const detected = fs.existsSync(detectedPath) ? JSON.parse(fs.readFileSync(detectedPath, "utf8")) : { vars: [] };

const recommended = [
  // App
  "APP_BASE_URL",
  "ENABLE_LIVE_INTEGRATIONS",
  "LOG_LEVEL",

  // Data / server
  "DATABASE_URL",
  "WEBHOOK_SHARED_SECRET",

  // Telephony (generic)
  "TELEPHONY_ACCOUNT_SID",
  "TELEPHONY_AUTH_TOKEN",
  "TELEPHONY_PHONE_NUMBER",
  "TELEPHONY_WEBHOOK_SECRET",

  // Speech (generic)
  "SPEECH_TTS_API_KEY",
  "SPEECH_STT_API_KEY",

  // Calendars
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REDIRECT_URI",
  "GOOGLE_REFRESH_TOKEN",

  "MS_CLIENT_ID",
  "MS_CLIENT_SECRET",
  "MS_TENANT_ID",
  "MS_REDIRECT_URI",

  // CRM
  "HUBSPOT_PRIVATE_APP_TOKEN",
  "HUBSPOT_CLIENT_ID",
  "HUBSPOT_CLIENT_SECRET",
  "HUBSPOT_REDIRECT_URI",

  "SF_CLIENT_ID",
  "SF_CLIENT_SECRET",
  "SF_LOGIN_URL",
  "SF_REFRESH_TOKEN",

  // Comms / Support
  "SLACK_BOT_TOKEN",
  "SLACK_SIGNING_SECRET",
  "SLACK_DEFAULT_CHANNEL_ID",

  "ZENDESK_SUBDOMAIN",
  "ZENDESK_EMAIL",
  "ZENDESK_API_TOKEN",

  // Forms / anti-spam
  "EMAIL_PROVIDER_API_KEY",
  "HCAPTCHA_SITE_KEY",
  "HCAPTCHA_SECRET"
];

const union = Array.from(new Set([...detected.vars, ...recommended])).sort();

const lines = [
  "# BookNest AI — Environment template",
  "# Place this file at full/.env (do NOT commit). Keep .env.example in git.",
  "",
  "# --- App ---",
  "APP_BASE_URL=",
  "ENABLE_LIVE_INTEGRATIONS=false",
  "LOG_LEVEL=info",
  "",
  "# --- Data / server ---",
  "DATABASE_URL=",
  "WEBHOOK_SHARED_SECRET=",
  "",
  "# --- Telephony (generic) ---",
  "TELEPHONY_ACCOUNT_SID=",
  "TELEPHONY_AUTH_TOKEN=",
  "TELEPHONY_PHONE_NUMBER=",
  "TELEPHONY_WEBHOOK_SECRET=",
  "",
  "# --- Speech (generic) ---",
  "SPEECH_TTS_API_KEY=",
  "SPEECH_STT_API_KEY=",
  "",
  "# --- Calendars ---",
  "GOOGLE_CLIENT_ID=",
  "GOOGLE_CLIENT_SECRET=",
  "GOOGLE_REDIRECT_URI=",
  "GOOGLE_REFRESH_TOKEN=",
  "MS_CLIENT_ID=",
  "MS_CLIENT_SECRET=",
  "MS_TENANT_ID=",
  "MS_REDIRECT_URI=",
  "",
  "# --- CRM ---",
  "HUBSPOT_PRIVATE_APP_TOKEN=",
  "HUBSPOT_CLIENT_ID=",
  "HUBSPOT_CLIENT_SECRET=",
  "HUBSPOT_REDIRECT_URI=",
  "SF_CLIENT_ID=",
  "SF_CLIENT_SECRET=",
  "SF_LOGIN_URL=",
  "SF_REFRESH_TOKEN=",
  "",
  "# --- Comms / Support ---",
  "SLACK_BOT_TOKEN=",
  "SLACK_SIGNING_SECRET=",
  "SLACK_DEFAULT_CHANNEL_ID=",
  "ZENDESK_SUBDOMAIN=",
  "ZENDESK_EMAIL=",
  "ZENDESK_API_TOKEN=",
  "",
  "# --- Forms / notifications ---",
  "EMAIL_PROVIDER_API_KEY=",
  "HCAPTCHA_SITE_KEY=",
  "HCAPTCHA_SECRET=",
  "",
  "# --- Detected in code (union) ---",
  ...union.map(v => `${v}=`),
  ""
];

fs.writeFileSync(path.join(ROOT, ".env.example"), lines.join("\n"));
console.log("Wrote full/.env.example with recommended + detected vars.");