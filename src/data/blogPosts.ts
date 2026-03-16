export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "revolucion-recarga-cordoba",
    title: "La revolución de la recarga llega a los barrios de Córdoba",
    excerpt: "Cómo los almacenes de cercanía están transformando el consumo masivo eliminando el plástico de un solo uso.",
    content: "En los últimos meses, Córdoba ha sido testigo de un cambio silencioso pero potente en la forma en que compramos productos de limpieza. El modelo de recarga inteligente de Ecly no solo permite ahorrar dinero, sino que está eliminando miles de envases plásticos que antes terminaban en basurales...",
    category: "Comunidad",
    date: "15 Mar, 2026",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    author: "Equipo Ecly"
  },
  {
    id: "limpieza-sin-toxicos",
    title: "Limpieza profunda sin tóxicos: El futuro del hogar",
    excerpt: "Descubrí por qué los productos biodegradables son la mejor opción para tu familia y el planeta.",
    content: "Muchas veces asociamos el olor a químicos fuertes con la limpieza, pero la realidad es muy distinta. Los nuevos productos de limpieza que podés encontrar en las estaciones Ecly están formulados para ser efectivos contra la suciedad pero amigables con tu salud...",
    category: "Sustentabilidad",
    date: "10 Mar, 2026",
    image: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&q=80&w=800",
    author: "María Luz"
  },
  {
    id: "ahorro-inteligente-2026",
    title: "Ahorro inteligente: Cómo reducir gastos en productos del hogar",
    excerpt: "Un análisis comparativo entre el modelo tradicional de envases y la recarga a granel.",
    content: "El costo de vida sube, pero tus gastos en limpieza pueden bajar. Al eliminar el costo del envase plástico y la logística pesada, la recarga inteligente ofrece un ahorro de hasta el 30% en productos de primera necesidad...",
    category: "Economía",
    date: "05 Mar, 2026",
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800",
    author: "Equipo Ecly"
  }
];