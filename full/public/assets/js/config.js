// full/assets/js/config.js
export const LIVE = (window?.ENV?.ENABLE_LIVE_INTEGRATIONS ?? "false") === "true";
// Frontend never reads secrets. All secrets live on the server.