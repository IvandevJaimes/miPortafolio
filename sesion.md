# Sesiones de desarrollo

## Sesión 1 - 30/03/2026

### Problema reportado
El portfolio se trababa y hacía un bucle infinito de requests al hacer scroll.

### Causa raíz
El archivo `Hero.tsx` tenía un `useEffect` que actualizaba 3 estados cada **50ms**, causando re-renders constantes.

### Solución aplicada
- Eliminé el useEffect del typing effect
- Ahora muestra "Backend Developer" estático (el cursor parpadea con CSS)

### Pendiente
- Los **Violation** al hacer scroll (~18 acumulados)
  - Probablemente de **React 19 + Vite en modo desarrollo**
  - También puede ser **flowbite** con timers internos
  - **NO aparecen en producción**

---

## Sesión 2 - 01/04/2026

### Trabajo realizado

#### 1. Partículas flotantes en Skeleton
- Creé efectos de partículas en el background del skeleton loading
- Usando CSS-only con `::before` y múltiples `box-shadow` o `radial-gradient`
- Colores del proyecto (green-neon, green-matrix, green-400, green-300)

#### 2. Componente Alert reutilizable
- Creado en `src/components/ui/Alert.tsx` y `alert.css`
- Props: `type`, `title`, `message`, `show`, `onClose`, `onRetry`, `autoClose`
- Estados: entrada/salida con animaciones suaves
- Botón de cerrar flotante en esquina superior derecha
- Auto-close después de 5 segundos (configurable)
- Colores diferenciados: verde esmeralda (success) y rojo (error)

#### 3. Integración con Hero
- Mostrar alert cuando falla el fetch del perfil
- Control de cierre manual y auto-close
- Botón de reintentar que recarga la página

#### 4. Limpieza de código
- Eliminé todos los comentarios obvios de:
  - `Alert.tsx`
  - `Hero.tsx`
  - `Skills.tsx`
  - `alert.css`
  - `vars.css`
  - `skeleton.css`
  - `hero.css`
  - `skills.css`

### Archivos creados/modificados
- `src/components/ui/Alert.tsx` - nuevo componente
- `src/components/ui/alert.css` - estilos del Alert
- `src/components/sections/hero/Hero.tsx` - integrado Alert
- `src/styles/vars.css` - agregados colores para Alert

### Pendiente
- Ninguno específico

---

## Sesión 3 - 02/04/2026

### Problemas identificados en revisión de código
- `useFetch` causaba re-renders infinitos por dependencia `fetchFn` sin estabilizar
- Timeout de API muy bajo (1 segundo)
- `window.location.reload()` para retry - mala práctica
- Menú mobile no se cerraba correctamente
- Funciones duplicadas en `skillsApi.ts`

### Trabajo realizado

#### 1.Mejora de useFetch
- Agregado parámetro `deps` para control de re-fetches
- Agregado `setError` en el return para limpiar errores manualmente
- Estabilizado con useCallback internamente

#### 2.Increase timeout de API
- `DEFAULT_TIMEOUT` subido de 1000ms a 10000ms (10 segundos)

#### 3.Hero retry sin reload
- Agregado `retryCount` state
- Al hacer retry, incrementa el contador y fuerza re-fetch
- Ya no reload toda la página

#### 4.Fix Header menú mobile
- Corregido `background-black` → `bg-black` (clase Tailwind válida)

#### 5.Limpieza de código
- Eliminada función duplicada `getCategorys` en `skillsApi.ts`

### Archivos modificados
- `src/hooks/useFetch.ts` - nuevo hook mejorado
- `src/services/api.ts` - timeout aumentado
- `src/services/skillsApi.ts` - eliminada función duplicada
- `src/components/layout/header/Header.tsx` - fix background
- `src/components/sections/hero/Hero.tsx` - retry logic
- `eslint.config.js` - argsIgnorePattern para signal

### Estado actual
- Branch: `fix/hero-refetch-timeout-menu-skills`
- Build: ✅ passing
- Lint: ⚠️ 1 warning (signal no usado - no bloqueante)

### Pendiente
- Revisión de tipos en Projects.tsx vs types.ts
- Agregar funcionalidad a botones de Hero (onClick)

---

## Sesión 4 - 04/04/2026

### Problema reportado
- Necesidad de actualizar TanStack Query (versión 1.0.0 incorrecta)
- Querer migrar useFetch personalizado a TanStack Query

### Trabajo realizado

#### 1. Migración a TanStack Query
- Corregida dependencia: `tanstack-query: ^1.0.0` → `@tanstack/react-query@latest`
- Configurado `QueryClientProvider` en `main.tsx`
- Config: `staleTime: 5min`, `retry: 2`, `refetchOnWindowFocus: false`
- Migrado `useFetch` de Hero.tsx y Header.tsx a `useQuery`
- Eliminado hook personalizado `src/hooks/useFetch.ts`

#### 2. Animación del grid en Hero
- Agregado movimiento suave en diagonal al fondo del Hero
- Animación infinita con `background-position: 65px 130px` (múltiplo del background-size)
- Duración: 12 segundos

#### 3. Modal de CV - Fecha de actualización
- Mostrada fecha de última actualización del CV en el modal
- Formato localized: "Actualizado el 4 abril 2026"

#### 4. Configuración de Vite para acceso externo
- Agregado `server: { host: true, port: 5173 }` en `vite.config.ts`
- Permite acceso desde dispositivos externos (celular)

#### 5. Projects - Migración a API
- Migrado Projects.tsx de datos hardcodeados a TanStack Query + service API
- Creado mapping para adaptar campos de la API:
  - `project_id` → `id`
  - `images[0].url` → `image`
  - `tags[].tag` → `tags[]`
  - `featured: 1` → `featured: true`
- Imágenes placeholder configurables en `src/data/projects.json`
- Placeholder detection: `isPlaceholder` flag con `opacity-70`

#### 6. Botones separados para Frontend/Backend/CRUD
- Botón Frontend (github) - borde slate-400
- Botón Backend (github_backend) - borde emerald-400
- Botón CRUD (github_crud) - borde amber-400
- Todos con logo GitHub y texto coloreado a juego

### Archivos modificados/creados
- `package.json` - dependencia corregida
- `src/main.tsx` - QueryClientProvider
- `src/services/projectsApi.ts` - servicio para proyectos
- `src/components/sections/projects/Projects.tsx` - migrateado a useQuery
- `src/data/projects.json` - imágenes placeholder
- `src/components/sections/hero/hero.css` - animación del grid
- `src/components/layout/header/Header.tsx` - fecha de CV
- `vite.config.ts` - server host

### Archivos eliminados
- `src/hooks/useFetch.ts`
- `src/components/sections/projects/data.ts`

### Estado actual
- Branch: `main` (commits locales pendientes)
- Build: ✅ passing
- Lint: ⚠️ Falsos positivos de ModalContext (ignorar)

### Pendiente
- Merge de commits pendientes
- Limpiar ramas obsolete

---

## Sesión 5 - 04/04/2026

### Trabajo realizado

#### 1. ProjectsSkeleton Component
- Creado componente `src/components/ui/skeletons/ProjectsSkeleton.tsx`
- Mismo estilo que Hero skeleton: partículas flotantes green-neon
- 6 skeleton cards con imagen, título, descripción, tags, botones
- Responsive: grid 1/2/3 columnas según breakpoint
- Shimmer animation con colores del proyecto

#### 2. ProjectsError Component
- Creado componente `src/components/ui/errorComponents/ProjectsError.tsx`
- Icono de error animado con pulso y anillo expansivo
- Muestra error.message de la API
- Botón "Reintentar" con gradiente verde-neon
- Partículas flotantes de fondo
- Estilos en `projectsError.css`

#### 3. ProjectsEmpty Component
- Creado componente `src/components/ui/ProjectsEmpty.tsx`
- Similar a ProjectsError pero para caso "sin proyectos"
- Icono de carpeta vacío con colores verde-neon
- Prop opcional `onRetry`
- Reutiliza estilos de projectsError.css

#### 4. Integración en Projects.tsx
- Estados manejados: isLoading → ProjectsSkeleton
- Error → ProjectsError (con error.message)
- Array vacío → ProjectsEmpty

### Archivos creados/modificados
- `src/components/ui/skeletons/ProjectsSkeleton.tsx` - skeleton para Projects
- `src/components/ui/skeletons/skeleton.css` - estilos del skeleton
- `src/components/ui/errorComponents/ProjectsError.tsx` - componente de error
- `src/components/ui/errorComponents/projectsError.css` - estilos
- `src/components/ui/ProjectsEmpty.tsx` - componente para lista vacía
- `src/components/ui/ProjectsEmpty.tsx` - import de estilos
- `src/components/sections/projects/Projects.tsx` - integrados los 3 estados

### Estado actual
- Branch: `feat/projects-improvements`
- Build: ✅ passing
- Pendiente: merge a main

---

## Sesión 6 - 05/04/2026

### Trabajo realizado

#### 1. ProjectCard como componente reutilizable
- Extraído a `src/components/ui/cards/ProjectCard.tsx`
- Props: project, onClick, animationDelay, isHovered, onMouseEnter, onMouseLeave
- Estilos en `src/components/ui/cards/card.css`
- Tags, badges (estrella, "En prod"), botones (FE/BE/CRUD/Code/Demo)

#### 2. Soporte para monorepo
- Campo `monorepo?: string` en interface Project
- Si tiene valor: muestra un solo botón "Código"
- Si no tiene: muestra los botones separados (FE, BE, CRUD)

#### 3. Partículas rojas en ProjectsError
- Agregadas partículas flotantes en proyectosError.css
- Mismas partículas que skeleton pero en tonos rojos (#ef4444, #f87171, #dc2626)

#### 4. Limpieza de comentarios
- Eliminados comentarios obvios de ProjectsSkeleton, ProjectsError, ProjectsEmpty
- Borrada sección "Badges" de card.css (era obvia)

#### 5. Eliminación de CSS duplicado
- ~160 líneas duplicadas entre projects.css y card.css removidas
- projects.css ahora solo tiene estilos de layout/container
- card.css tiene todos los estilos de la card
- Import agregado en Projects.tsx

### Archivos creados/modificados
- `src/components/ui/cards/ProjectCard.tsx` - nuevo componente
- `src/components/ui/cards/card.css` - estilos de la card
- `src/components/sections/projects/Projects.tsx` - usa ProjectCard + import card.css
- `src/components/sections/projects/projects.css` - limpio, sin duplicados
- `src/components/ui/errorComponents/projectsError.css` - partículas rojas
- `src/types/types.ts` - agregado campo monorepo

### Estado actual
- Branch: `feat/projects-improvements`
- Build: ✅ passing
- CSS: 62.90 KB (reducido de 63.35 KB)
- Pendiente: merge a main

---

## Sesión 7 - 05/04/2026

### Trabajo realizado

#### 1. Partículas rojas en ProjectsError
- Agregadas partículas flotantes rojas al componente de error
- Mismos colores y animación que skeleton pero en rojo
- Fondo会比 más bonito cuando hay error

#### 2. Limpieza de comentarios innecesarios
- Recorrido por todo el proyecto
- Eliminados comentarios evidentes en:
  - ProjectsSkeleton.tsx
  - ProjectsError.tsx
  - ProjectsEmpty.tsx
  - card.css

#### 3. Nueva rama y limpieza de CSS duplicado
- Rama: `fix/remove-duplicate-css`
- Eliminado código duplicado entre projects.css y card.css (~160 líneas)
- Import de card.css agregado en Projects.tsx

### Archivos modificados
- `src/components/ui/skeletons/ProjectsSkeleton.tsx` - comentarios eliminados
- `src/components/ui/errorComponents/ProjectsError.tsx` - comentarios eliminados
- `src/components/ui/ProjectsEmpty.tsx` - comentarios eliminados
- `src/components/ui/cards/card.css` - comentarios y duplicados eliminados
- `src/components/sections/projects/projects.css` - дубликаты удалены

### Estado actual
- Branch: `feat/projects-improvements`
- Build: ✅ passing
- Pendiente: merge a main