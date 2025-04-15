# ♻️ Intercambio App – Frontend

Este es el **frontend móvil** de la aplicación de intercambio y venta de productos entre usuarios, con el objetivo de **fomentar la reutilización y reducir la generación de residuos**. La aplicación está construida con **React Native** y **TypeScript**, lo que permite una experiencia nativa en dispositivos Android e iOS desde una sola base de código.

## ⚠️ Estado del proyecto

> 🧪 **Este proyecto está en fase beta de desarrollo.**
>
> Algunas funcionalidades pueden no estar completas o presentar errores.

---

## 📱 Tecnologías utilizadas

- **React Native** – Framework para construir aplicaciones móviles nativas usando React.
- **TypeScript** – Superset de JavaScript con tipado estático para mayor robustez y escalabilidad.
- **Expo** – Herramienta que simplifica el desarrollo, pruebas y despliegue de apps React Native.
- **React Navigation** – Para la navegación entre pantallas.
- **Axios / SWR** – Para el consumo de APIs REST.
- **Context API o Zustand / Redux** – Para el manejo del estado global _(dependiendo de la implementación final)_.
- **ESLint + Prettier** – Linting y formateo de código.

---

## 🚀 Instalación y ejecución en desarrollo

### 1. Clonar el repositorio

```bash
git clone https://github.com/EcoIntercambio/Frontend.git
cd intercambio-app-frontend
```

### 2. Instalar las dependencias

```bash
npm install
```

> Si usas `yarn` también puedes usar `yarn install`.

### 3. Iniciar el servidor de desarrollo

```bash
npm start
```

Esto abrirá el panel de control de Expo en tu navegador. Desde ahí podrás:

- Escanear el QR con la app de Expo Go (Android/iOS)
- Ejecutar la app en un emulador Android/iOS
- Ver logs en tiempo real

---

## 🛠️ Construcción para producción

### Android

```bash
npx expo export --platform android
```

O para generar un `.apk` o `.aab` directamente (requiere cuenta en Expo):

```bash
npx expo build:android
```

### iOS

```bash
npx expo export --platform ios
```

O generar `.ipa`:

```bash
npx expo build:ios
```

> Nota: para compilar para iOS en producción necesitas una cuenta de desarrollador de Apple.

---

## 🌍 Entorno de variables

Crea un archivo `.env` en la raíz del proyecto para definir variables sensibles (API URL, claves, etc.):

```
API_URL=https://api.tu-backend.com
```

Y asegúrate de que estén definidas en `app.config.js` o `expo.config.js` si usas Expo.

---

## 📷 Previews

<!-- Agrega aquí capturas de pantalla de la app en funcionamiento -->

<p align="center">
  <img src="./docs/beta-preview/preview-beta (1).jpg" width="200" alt="Pantalla de inicio" />
  <img src="./docs/beta-preview/preview-beta (2).jpg" width="200" alt="Lista de productos" />
  <img src="./docs/beta-preview/preview-beta (3).jpg" width="200" alt="Detalles de producto" />
  <img src="./docs/beta-preview/preview-beta (4).jpg" width="200" alt="Chat" />
  <img src="./docs/beta-preview/preview-beta (5).jpg" width="200" alt="Perfil de usuario" />
  <img src="./docs/beta-preview/preview-beta (6).jpg" width="200" alt="Publicar producto" />
  <img src="./docs/beta-preview/preview-beta (7).jpg" width="200" alt="Formulario de producto" />
</p>

---

## 📁 Estructura del proyecto

```
/src
  /components     → Componentes reutilizables
  /screens        → Pantallas de la app
  /services       → API calls y lógica externa
  /contexts       → Contextos globales
  /utils          → Funciones auxiliares
  /assets         → Imágenes, íconos, etc.
App.tsx          → Punto de entrada principal
```

---

## 🧪 Testing _(opcional)_

Si estás usando pruebas:

```bash
npm test
```

o

```bash
jest
```

ón de "Roadmap", o instrucciones específicas si se usa EAS para el build?
