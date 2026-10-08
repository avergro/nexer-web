# OAuth provider para Decap CMS (Cloudflare Worker)

Worker que permite a Decap CMS autenticarse con GitHub. GitHub exige un
`client_secret` para el intercambio de tokens, algo que no puede hacerse en el
navegador; este worker lo hace en el servidor y devuelve el token al CMS.

## Despliegue (una sola vez)

Requiere cuenta de Cloudflare (ya la tienes). Desde esta carpeta:

```bash
# 1. Instalar/actualizar wrangler y hacer login
npx wrangler login

# 2. Guardar el client secret de la OAuth App de GitHub como secreto
npx wrangler secret put OAUTH_CLIENT_SECRET
#   (pega el valor cuando te lo pida)

# 3. Desplegar
npx wrangler deploy
```

Al terminar, `wrangler` te imprime la URL del worker, normalmente:

```
https://nexer-oauth.<tu-subdominio>.workers.dev
```

## Configurar el sitio

1. En el OAuth App de GitHub (Settings → Developer settings → OAuth apps →
   NEXER CMS), agrega esta **Redirect URI**:

   ```
   https://nexer-oauth.<tu-subdominio>.workers.dev/callback
   ```

   (puedes dejar la anterior o reemplazarla)

2. En `public/admin/config.yml`, cambia el backend a:

   ```yaml
   backend:
     name: github
     repo: avergro/nexer-web
     branch: main
     base_url: https://nexer-oauth.<tu-subdominio>.workers.dev
   ```

## Variables de entorno

| Variable             | Tipo    | Descripción                                  |
| -------------------- | ------- | -------------------------------------------- |
| `OAUTH_CLIENT_ID`    | var     | Client ID de la OAuth App (ya está puesta)   |
| `OAUTH_CLIENT_SECRET`| secret  | Client Secret de la OAuth App (secreto)      |
| `ORIGINS`            | var     | Orígenes permitidos (por defecto avergro.github.io) |
