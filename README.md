# Praga Quart — La carta

Carta web responsive de Praga Quart, construida con React, TypeScript y Vite. Los productos, categorías y formatos de precio se gestionan desde los CSV de `src/data`.

## Desarrollo local

```sh
npm ci
npm run dev
```

Para generar el build de producción:

```sh
npm run build
```

## Publicación en GitHub Pages

El workflow de `.github/workflows/deploy.yml` construye y publica el sitio automáticamente al subir cambios a `main`. En GitHub, configura **Settings → Pages → Build and deployment → Source: GitHub Actions**.

El build detecta el nombre del repositorio en GitHub Actions y configura la ruta de recursos para el sitio de Pages.
