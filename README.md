# Dragon Ball React - Monorepo

Este es un proyecto basado en **React** que sigue una **arquitectura hexagonal** y está estructurado como un **monorepo**. Además, incluye un paquete de estilos independiente llamado **abc-styles**.

## 📁 Estructura del Monorepo

```
/src
  /context
  /hooks
    /tests
  /infrastructure
    /httpInterceptor
  /modules
    /Character
      /application
        /tests
      /domain
      /infrastructure
  /ui
    /components
    /pages
  /tests
/packages
  /abc-styles  (Paquete de estilos reutilizable)
```

## 🏗️ Arquitectura Hexagonal

El proyecto sigue una **arquitectura hexagonal**, lo que significa que el código está dividido en capas independientes, separando la lógica de negocio de la infraestructura y la interfaz de usuario. Esto facilita la mantenibilidad y permite la escalabilidad del sistema.

## 🚀 Instalación

Para instalar las dependencias del proyecto, asegúrate de estar en la raíz del monorepo y ejecuta:

```sh
pnpm install
```

Si estás en un paquete específico como **dragon-ball-app**, usa:

```sh
pnpm install --filter dragon-ball-app
```

## 🛠️ Modo Desarrollo

Para ejecutar la aplicación en modo desarrollo con **Vite**, usa:

```sh
pnpm dev
```

## 📦 Modo Producción

Para construir y servir la aplicación en modo producción, usa:

```sh
pnpm build && pnpm preview
```

## 🖥️ 💡 **Guía de Instalación en Windows**

Si estás utilizando **Windows**, sigue estos pasos para evitar problemas de compatibilidad:

### **1️⃣ Requisitos Previos**

Antes de ejecutar el proyecto, instala lo siguiente:

- **Git for Windows** → [Descargar aquí](https://gitforwindows.org/)
- **Node.js (versión 20 o superior)** → [Descargar aquí](https://nodejs.org/)
- **pnpm (Gestor de paquetes)** → Instalar con:
  ```sh
  corepack enable
  corepack prepare pnpm@latest --activate
  ```
- **Opcional (si usas PowerShell)**: Instalar `windows-build-tools`
  ```sh
  npm install --global windows-build-tools
  ```

### **2️⃣ Clonar el Repositorio**

```sh
git clone https://github.com/dniskav/dragon-ball-react.git
cd dragon-ball-react
```

### **3️⃣ Instalar las Dependencias**

```sh
pnpm install
```

⚠️ **Si aparece un error sobre "Unsupported platform"**, elimina `node_modules` y reinstala:

```sh
rm -rf node_modules pnpm-lock.yaml
pnpm install --force
```

### **4️⃣ Ejecutar el Proyecto**

```sh
pnpm dev
```

### **🐛 Solución de Problemas en Windows**

**📌 `pnpm` no se encuentra**
Si `pnpm` no está instalado, ejecuta:

```sh
npm install -g pnpm
```

**📌 Error `Unsupported platform for esbuild`**
Si aparece un error de **esbuild**, instala la versión correcta:

```sh
pnpm add -D esbuild@latest
```

**📌 Error `rsync not found` (al hacer deploy)**
Si en el **deploy a GitHub Pages** aparece:

```sh
Error: Unable to locate executable file: rsync
```

Debes instalar **rsync** en Windows con Chocolatey:

```sh
choco install rsync -y
```

O cambiar a **Ubuntu WSL** para evitar problemas.

---
