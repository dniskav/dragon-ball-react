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
yarn install
```

Si estás en un paquete específico como **dragon-ball-app**, usa:

```sh
yarn workspace dragon-ball-app install
```

## 🛠️ Modo Desarrollo

Para ejecutar la aplicación en modo desarrollo con **Vite**, usa:

```sh
yarn dev
```

## 📦 Modo Producción

Para construir y servir la aplicación en modo producción, usa:

```sh
yarn build && yarn preview
```

## 📝 Notas

- **abc-styles** es un paquete independiente que contiene los estilos reutilizables.
- Los módulos están organizados siguiendo principios de arquitectura hexagonal.

Si tienes dudas o quieres contribuir, siéntete libre de hacerlo. ¡Feliz desarrollo! 🚀
