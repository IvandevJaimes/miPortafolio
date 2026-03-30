export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce API",
    description:
      "API RESTful completa para tienda online con autenticación JWT, pagos con Stripe, gestión de productos y órdenes. Arquitectura limpia con TypeScript.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    tags: ["Node.js", "Express", "TypeScript", "PostgreSQL", "JWT", "Stripe"],
    github: "https://github.com",
    featured: false,
  },
  {
    id: 2,
    title: "Task Manager Pro",
    description:
      "Aplicación de gestión de tareas en tiempo real con WebSockets, drag & drop, y colaboración multiusuario. Dashboard analítico incluido.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Redux"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
  },
  {
    id: 3,
    title: "Portfolio Web",
    description:
      "Mi portfolio personal con diseño moderno, animaciones fluidas y optimización SEO. Carga rápida y responsive en todos los dispositivos.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    tags: ["React", "TypeScript", "TailwindCSS", "Vite"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
  },
  {
    id: 5,
    title: "Dashboard Analytics",
    description:
      "Panel de análisis de datos con gráficos interactivos, exportación a PDF/Excel y alertas en tiempo real. Visualizaciones avanzadas.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["React", "D3.js", "TypeScript", "Express", "Chart.js"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 6,
    title: "Booking System",
    description:
      "Sistema de reservas para hotels y restaurantes con calendario disponibilidad, pagos online y emails automáticos de confirmación.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    tags: ["React", "Node.js", "PostgreSQL", "AWS", "SendGrid"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
];

// Función para obtener proyectos (simula llamada a API)
export const getProjects = async (): Promise<Project[]> => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 100));
  return projects;
};

// Función para obtener proyecto por ID
export const getProjectById = async (
  id: number,
): Promise<Project | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return projects.find((p) => p.id === id);
};

// Función para obtener proyectos destacados
export const getFeaturedProjects = async (): Promise<Project[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return projects.filter((p) => p.featured);
};
