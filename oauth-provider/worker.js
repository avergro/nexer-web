// Decap CMS — GitHub OAuth provider (Cloudflare Worker)
//
// Decap CMS's GitHub backend cannot do OAuth in the browser (GitHub requires a
// client secret). This worker does the token exchange server-side and returns
// the access token to the CMS via the Netlify-compatible postMessage handshake.
//
// Endpoints:
//   GET /auth     -> redirects to GitHub OAuth authorize
//   GET /callback -> exchanges code for token, returns the handshake HTML
//   GET /debug    -> shows client_id and whether the secret is bound (no secret values)
//
// Env vars:
//   OAUTH_CLIENT_ID     (public, in wrangler.jsonc vars)
//   OAUTH_CLIENT_SECRET (secret: `npx wrangler secret put OAUTH_CLIENT_SECRET`)
//   ORIGINS             (comma-separated allowed hosts, e.g. avergro.github.io)
//   OAUTH_SCOPE         (optional, default "public_repo" — public repos only)

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      return redirectToGitHub(url, env);
    }
    if (url.pathname === "/callback") {
      return handleCallback(url, env);
    }
    if (url.pathname === "/debug") {
      return new Response(
        JSON.stringify(
          {
            client_id: env.OAUTH_CLIENT_ID || null,
            secret_bound: Boolean(env.OAUTH_CLIENT_SECRET),
            secret_length: env.OAUTH_CLIENT_SECRET ? env.OAUTH_CLIENT_SECRET.length : 0,
            origins: env.ORIGINS || null,
          },
          null,
          2
        ),
        { headers: { "content-type": "application/json" } }
      );
    }
    if (url.pathname === "/") {
      return new Response(
        '<html><body><p>NEXER CMS OAuth provider.</p><p><a href="/auth">Log in</a></p></body></html>',
        { headers: { "content-type": "text/html" } }
      );
    }
    return new Response("Not found", { status: 404 });
  },
};

function redirectToGitHub(url, env) {
  const redirectUri = redirectURL(url, env);
  const scope = env.OAUTH_SCOPE || "public_repo";

  const params = new URLSearchParams({
    client_id: env.OAUTH_CLIENT_ID,
    redirect_uri: redirectUri,
    scope,
    state: crypto.randomUUID(),
  });

  return Response.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`,
    302
  );
}

function redirectURL(url, env) {
  return env.REDIRECT_URL || new URL("/callback", url).toString();
}

async function handleCallback(url, env) {
  const code = url.searchParams.get("code");
  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  const body = new URLSearchParams({
    client_id: env.OAUTH_CLIENT_ID,
    client_secret: env.OAUTH_CLIENT_SECRET,
    code,
    redirect_uri: redirectURL(url, env),
  });

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const data = await tokenRes.json();
  if (!data.access_token) {
    return new Response(`Token exchange failed: ${JSON.stringify(data)}`, {
      status: 500,
      headers: { "content-type": "text/plain" },
    });
  }

  const payload = JSON.stringify({ token: data.access_token, provider: "github" });
  const allowed = (env.ORIGINS || "avergro.github.io")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const html = `<!doctype html><html><body><script>
(function(){
  var allowed = ${JSON.stringify(allowed)};
  function hostMatches(origin) {
    var host = String(origin || "").replace(/^https?:\\/\\//, "").split("/")[0];
    return allowed.some(function(a){
      return host === a || host.endsWith("." + a);
    });
  }
  function onMessage(e) {
    if (!hostMatches(e.origin)) return;
    window.opener.postMessage(
      "authorization:github:success:" + ${JSON.stringify(payload)},
      e.origin
    );
  }
  window.addEventListener("message", onMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script></body></html>`;

  return new Response(html, { headers: { "content-type": "text/html" } });
}
