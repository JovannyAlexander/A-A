# A&A — Alexa y Arianna | Tienda virtual

Tienda de accesorios, maquillaje y joyas. Catálogo con precios y stock, enlace a WhatsApp por producto, panel administrador (datos en el navegador). Preparada para desplegar en **AWS con servicios gratuitos**.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3001](http://localhost:3001).

## Build estático (para AWS)

```bash
npm run build
```

Se genera la carpeta **`out`** con el sitio estático (HTML, CSS, JS). Esa carpeta es la que se sube a S3 o se usa en Amplify.

---

## Despliegue en AWS (servicios gratuitos)

Puedes usar **una** de estas dos opciones.

### Opción 1: AWS Amplify (recomendada, más fácil)

Amplify ofrece un nivel gratuito (límites de ancho de banda y minutos de build).

1. **Sube el proyecto a GitHub** (crea un repo y haz push de este código).

2. **En AWS:** entra a [Amplify Console](https://console.aws.amazon.com/amplify/), **New app** → **Host web app** → **GitHub** y autoriza. Elige el repositorio y la rama (p. ej. `main`).

3. **Build settings:** Amplify detectará el `amplify.yml` del repo. Debe verse así:
   - **Build:** `npm run build`
   - **Artifacts:** directorio `out`

4. **Guardar y desplegar.** Amplify hará `npm ci`, `npm run build` y publicará el contenido de `out`. Te dará una URL tipo `https://main.xxxxx.amplifyapp.com`.

5. **Opcional – dominio propio:** en Amplify → **Domain management** puedes añadir tu dominio.

Con esto la app ya corre en AWS en modo estático y gratuito (dentro del free tier de Amplify).

---

### Opción 2: S3 + CloudFront (solo hosting estático)

Todo el sitio son archivos estáticos; no hace falta servidor. Free tier incluye 5 GB en S3 y 1 TB de transferencia en CloudFront (primer año).

1. **Build local:**
   ```bash
   npm run build
   ```

2. **Crear bucket S3:**
   - En AWS Console → S3 → **Create bucket** (nombre único, p. ej. `aa-tienda-tu-nombre`).
   - Desactiva “Block all public access” y confirma (el bucket será público para lectura).
   - En **Properties** del bucket → **Static website hosting** → **Enable** → Index: `index.html`, Error: `index.html` (para que el enrutado del SPA funcione).

3. **Subir el contenido de `out`:**
   - Entra al bucket → **Upload**.
   - Sube **todo** el contenido de la carpeta `out` (incluyendo `index.html` y la carpeta que tenga los assets). No subas la carpeta `out` como nombre; sube su contenido para que `index.html` quede en la raíz del bucket.

4. **Permisos del bucket:**
   - **Permissions** → **Bucket policy** y usa una política que permita `GetObject` público, por ejemplo:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::NOMBRE-DE-TU-BUCKET/*"
       }
     ]
   }
   ```
   Sustituye `NOMBRE-DE-TU-BUCKET` por el nombre real del bucket.

5. **Probar:** en **Properties** → **Static website hosting** verás la URL del sitio (tipo `http://NOMBRE-BUCKET.s3-website-region.amazonaws.com`). Ábrela en el navegador.

6. **Opcional – CloudFront (HTTPS y más rápido):**
   - CloudFront → **Create distribution**.
   - **Origin domain:** elige el endpoint de “Static website hosting” del bucket (no el del tipo “Objects”).
   - **Default root object:** `index.html`.
   - Crea la distribución y espera a que esté “Deployed”. Usa la URL de CloudFront (ej. `https://xxxxx.cloudfront.net`) para acceder al sitio con HTTPS.

---

## Estructura del proyecto

```
aia/
├── app/              # Páginas (Next.js App Router)
├── components/       # React (Navbar, Hero, ProductCard, Admin…)
├── data/             # products.json inicial
├── lib/              # Lógica productos (localStorage)
├── public/           # Logo.png, logo-icono.png
├── types/            # TypeScript
├── amplify.yml       # Configuración build para AWS Amplify
└── out/              # Generado por npm run build (subir a S3 o usar en Amplify)
```

## Notas

- **Datos:** Los productos se guardan en `localStorage` del navegador. Cada usuario/dispositivo tiene su propia lista. Para una base de datos real haría falta un backend (p. ej. API en Lambda + DynamoDB).
- **WhatsApp:** Cambia el número en cada producto desde el panel Administrador o en `data/products.json` (campo `whatsappNumber`).
- **Logo:** Coloca `Logo.png` y `logo-icono.png` en `public/`. Se sirven desde la raíz del sitio en producción.

---

A&A — Alexa y Arianna. Desplegado en AWS con servicios gratuitos.
