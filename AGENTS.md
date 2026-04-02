# AGENTS.md — Reglas de Código para miPortafolio

## Principios Generales

- **Código limpio**: menos es más, legible > inteligente
- **Evitar lógica innecesaria**: no sobreinges, no prepárate para problemas que no tenés
- **Código moderno**: nada de `var`, lifecycle methods deprecated, class components
- **DRY con cabeza**: si se repite 3+ veces, extraer; si es único, dejar ahí

---

## Estilo de Código

### Variables y Funciones
- `camelCase` para todo: `const userName`, `function getUserById`
- **Siempre funciones flecha**: `const handleClick = () => {}`
- Nombres descriptivos pero concisos: `isLoading` > `flag`, `projectsData` > `data`

### Componentes React
- **PascalCase**: `UserProfile.tsx`, `ProjectCard.tsx`
- Props interfaces con `Props` suffix: `interface UserCardProps`
- Un componente por archivo (salvo small helpers)

### CSS
- **kebab-case**: `.hero-container`, `project-card-glow`
- Custom properties para colores/tokens: `--color-primary`
- **NUNCA** estilos inline salvo rarezas puntuales

---

## Tailwind + CSS (Equilibrio Obligatorio)

| Usar Tailwind | Usar CSS |
|---------------|----------|
| `flex`, `grid`, `block` | Animaciones complejas (`@keyframes`) |
| `p-4`, `m-auto`, `gap-2` | Media queries complejas |
| Breakpoints simples (`md:flex`) | Pseudoelementos (`::before`, `::after`) |
| Colores, spacing, typography | Selectores complejos (`:not()`, `:has()`) |
| Responsive básico | Estados complejos (`hover`, `focus-within`) |
| Utilities rápidas | Custom properties/variables |

**Regla de oro**: Tailwind para estructura y layout, CSS para efectos y casos especiales.

---

## Comentarios

- **NO** comentarios obvios: `// iterate array` > `// for each item`
- **SÍ** comentarios cuando:
  - Algo no es evidente a simple vista
  - Workaround de bug conocido
  - Decisión de arquitectura no obvia
  - Regex, magia negra, math raro

---

## TypeScript

- **NUNCA** `any`. Usar `unknown` si es necesario
- Tipar TODO: funciones, props, estados, respuestas API
- Interfaces para objetos, Types para uniones
- `strict: true` implicado

---

## React Patterns

- Early return para loading/error states
- Un `useState` por cosa (no objeto gigante si no va)
- Custom hooks para lógica reutilizable
- `useCallback` solo cuando necesario (event handlers pasados a children)
- `useEffect` con cleanup si hay subscriptions/timers

---

## Git

- Commits en **español siempre**: `feat: agregar perfil de usuario`, `fix: resolver cierre de modal`
- **Breves y claros**: máximo 50 caracteres en el título
- Rama por feature: `feat/proyectos-grid`, `fix/hero-timeout`
- PRs chiquitos > PRs masivos

---

## Imports (Orden Sugerido)

```typescript
// 1. React
import { useState, useEffect } from 'react';

// 2. Router
import { useNavigate } from 'react-router-dom';

// 3. Componentes propios
import { Button, Modal } from '@/components/ui';

// 4. Servicios/APIs
import { getUser } from '@/services';

// 5. Tipos
import type { User } from '@/types';

// 6. Estilos
import './styles.css';
```

---

## Errores Comunes (Evitar)

- `console.log` en producción → eliminar o usar logger
- Mutating state directamente → siempre immutable
- Fetch sin AbortController → memory leaks
- Props drilling → usar context o extractor
- Funciones de 100 líneas → splittear
- CSS absoluto en todo → usar layout tools
