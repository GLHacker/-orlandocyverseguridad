export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = import.meta.env.vite || "Orlando Cyber Seguridad";

export const APP_LOGO = "https://placehold.co/128x128/E1E7EF/1F2937?text=App";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = ( ) => {
  const oauthPortalUrl = import.meta.env.vite_oauth_portal_url || "https://oauth.example.com";
  const appId = import.meta.env.vite || "orlando-cyber-app";
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri );

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};

