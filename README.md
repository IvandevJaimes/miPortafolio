# Ivan Jaimes Portfolio

Portafolio personal de desarrollador fullstack construido con React, TypeScript y Vite.
Aplicación web moderna y responsive diseñada para mostrar proyectos, habilidades y experiencia de forma clara y profesional. Implementa buenas prácticas de desarrollo frontend, consumo de APIs y además se integra con un backend propio para la gestión dinámica de contenido.

● Repo API: https://github.com/IvandevJaimes/miPortafolioApi

## Tecnologías utilizadas

### Frontend

- React 19
- TypeScript
- Vite 7
- React Router DOM 7
- TanStack Query 5
- Tailwind CSS 4
- Flowbite & Flowbite React
- React Helmet Async
- React Hook Form
- Typed.js
- Iconify React
- Mammoth (para procesar documentos)

### Herramientas de desarrollo

- ESLint 9
- PostCSS 10
- Autoprefixer 10
- TypeScript 5.9

## Estructura del proyecto

```
src/
├── components/
│   ├── layout/         # Header y Footer
│   ├── sections/       # Secciones principales (Hero, Projects, Skills, Contact)
│   └── ui/             # Componentes reutilizables (botones, tarjetas, iconos)
├── context/            # Context API (ModalContext)
├── data/               # Datos estáticos (site.json)
├── pages/              # Páginas de la aplicación (MainPage, ProjectPage)
├── services/           # Servicios API (projects, skills, contact, profile)
└── App.tsx             # Componente raíz con routing
```

## Características

- Diseño responsive
- Navegación cliente-side con React Router
- Manejo de estados con React Query
- Temas y componentes UI con Tailwind CSS y Flowbite
- Optimización de meta tags para SEO y redes sociales
- Manejo de errores y estados de carga
- Formulario de contacto integrado
- Visualización de habilidades y proyectos

## Scripts disponibles

- `dev`: Inicia el servidor de desarrollo con Vite
- `build`: Compila TypeScript y genera build de producción
- `lint`: Ejecuta ESLint para análisis de código
- `preview`: Vista previa del build de producción

## Configuración de despliegue

El proyecto está configurado para desplegarse en Vercel mediante `vercel.json` que redirige todas las rutas al index.html para soportar el routing cliente-side de React Router.

## Requisitos

- Node.js 18+
- npm o yarn

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Producción

```bash
npm run build
npm run preview
```
