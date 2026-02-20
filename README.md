# A&A — Alexa y Arianna | Tienda virtual

Tienda de accesorios, maquillaje y joyas. Catálogo con precios y stock, enlace a WhatsApp por producto, panel administrador (datos en localStorage). React + Vite + Tailwind, preparada para AWS Amplify Hosting.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3002](http://localhost:3002).

## Build

```bash
npm run build
```

Se genera `dist/`. Para Amplify, el script `scripts/amplify-output.js` crea `.amplify-hosting/` con `deploy-manifest.json` (requerido por Amplify).

---

## Despliegue en AWS Amplify

1. **Sube el proyecto a GitHub** y enlázalo en [Amplify Console](https://console.aws.amazon.com/amplify/).

2. **Build settings:** El `amplify.yml` del repo configura el build y usa `baseDirectory: .amplify-hosting`.

3. **Rewrite SPA (importante):** Para que rutas como `/admin` funcionen al refrescar, añade una regla en Amplify:
   - **Hosting** → **Redirects and rewrites** → **Edit**
   - **Source address:** `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>`
   - **Target address:** `/index.html`
   - **Type:** `200 (Rewrite)` (no redirect)
   - **Save**

4. **Guardar y desplegar.** La URL será tipo `https://main.xxxxx.amplifyapp.com`.

---

## Estructura del proyecto

```
aia/
├── src/
│   ├── components/     # Navbar, Hero, ProductCard, Admin, etc.
│   ├── pages/          # Home, Admin
│   ├── data/           # products.json inicial
│   ├── lib/            # products.ts, auth.ts, whatsapp.ts
│   └── types/          # product.ts
├── public/             # logo.svg, logo-icon.svg
├── scripts/
│   └── amplify-output.js   # Genera .amplify-hosting para Amplify
├── amplify.yml         # Configuración build Amplify
├── customHttp.yml      # Headers de seguridad
└── dist/               # Generado por npm run build
```

## Notas

- **Datos:** Productos en `localStorage`. Admin: usuario `admin` / contraseña `admin` (configurable vía `VITE_ADMIN_USER` y `VITE_ADMIN_PASSWORD`).
- **WhatsApp:** Número central en `src/lib/whatsapp.ts` o en cada producto desde el panel Admin.
