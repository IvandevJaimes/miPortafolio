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