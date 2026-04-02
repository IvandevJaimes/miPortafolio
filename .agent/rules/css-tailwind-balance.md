# CSS + Tailwind: Equilibrio

## Regla simple

**Todo en Tailwind, EXCEPTO lo que no se puede hacer.**

---

## TAILWIND

```tsx
<div className="flex items-center justify-between p-4 gap-2">
<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
<div className="text-sm md:text-lg font-bold text-white bg-green-500">
<div className="rounded-lg shadow-md border border-gray-300">
<div className="hover:bg-blue-600 transition-all duration-300">
```

---

## CSS (solo cuando no hay otra opción)

### Animaciones keyframes
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### Selectores nth-child
```css
.item:nth-child(2) { margin-top: 1rem; }
```

---

## Ejemplo

### Component.tsx
```tsx
import "./Component.css";

<div className="card">
  <h3 className="text-xl font-bold text-white mb-4">Título</h3>
  <p className="text-sm text-gray-400">Descripción</p>
  <button className="btn-primary">Click</button>
</div>
```

### Component.css
```css
.btn-primary {
  @apply px-4 py-2 rounded-lg font-medium;
  background: var(--green-neon);
}

.btn-primary:hover { transform: scale(1.05); }

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.card .shimmer {
  animation: shimmer 2s linear infinite;
}
```

---

## Comentarios

### Regla de oro

**NO escribir comentarios evidentes.** Si el código no se explica solo, el código está mal, no falta un comentario.

### Ejemplos de COMENTARIOS QUE NO VAN

```tsx
// ❌ NO - Evidente
{/* Grid background */}
<div className="hero-grid" />

{/* Left side - Content */}
<div className="flex flex-col gap-4">

{/* Botón descargar CV */}
<button>Descargar CV</button>

// ❌ NO - Lo que hace la función ya se entiende
// Función que suma dos números
const sum = (a, b) => a + b;
```

### Ejemplos de COMENTARIOS QUE SÍ PUEDEN IR

```tsx
// ✅ SÍ - Contexto que no está en el código
// API de terceros con rate limit de 100 req/min
const api = new ExternalAPI();

// ✅ SÍ - Decisiones de arquitectura
// Usamos useMemo porque el cálculo es costoso (>1ms)
const expensiveValue = useMemo(() => compute(), [deps]);

// ✅ SÍ - Workaround de bugs conocidos
// FIXME: Safari flexbox bug - revisar en Safari 15+
display: flex;
```

### En CSS

```css
/* ❌ NO - Lo que se ve en el código */
.selector { /* Selector para el botón */ }

/* ✅ SÍ - Por qué de esta decisión */
.selector {
  /* hack para IE11 que no soporta grid */
  display: flex;
}
```

---

## Resumen

| Vaugh | Usar |
|--------|-------|
| Layout, spacing, colores, responsive | **Tailwind** |
| Animaciones @keyframes | **CSS** |
| nth-child, last-child | **CSS** |
| Comentarios evidentes | **NUNCA** |
