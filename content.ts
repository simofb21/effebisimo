export type ProjectStatus =
  | "active-dev"
  | "active-done"
  | "archived"
  | "closed";

export interface ProjectData {
  slug: string;
  name: string;
  tech: string;
  github?: string; // se assente mostra "No source code available"
  image: string;
  status: ProjectStatus;
}

export const projectsList: ProjectData[] = [
  {
    slug: "best-ride",
    name: "Best Ride",
    tech: "Nuxt.js, PostgreSQL",
    github: "https://github.com/simofb21/best-ride",
    image: "/projects/best-ride.jpg",
    status: "active-dev",
  },
  {
    slug: "mercatino",
    name: "Libri Usati Crema",
    tech: "PHP-Laravel, Vue.js, MySQL",
    github: "https://github.com/Mercatino-Libri-Usati/mercatino",
    image: "/projects/mercatino.jpg",
    status: "active-done",
  },
  {
    slug: "effebisimo",
    name: "effebisimo",
    tech: "Nuxt.js",
    github: "https://github.com/simofb21/effebisimo",
    image: "/projects/effebisimo.jpg",
    status: "active-dev",
  },
  {
    slug: "iris",
    name: "Iris - Frontend",
    tech: "Vue.js",
    image: "/projects/iris.jpg",
    status: "archived",
  },
  {
    slug: "appunti-unimi",
    name: "Appunti Unimi",
    tech: "PDF, Foto",
    github: "https://github.com/simofb21/appunti-unimi",
    image: "/projects/unimi.jpg",
    status: "active-dev",
  },
  {
    slug: "meteo-api",
    name: "Meteo API",
    tech: "Vue.js",
    github: "https://github.com/simofb21/meteo.api",
    image: "/projects/meteo.jpg",
    status: "active-done",
  },
  {
    slug: "fb-bike",
    name: "FB-BIKE.it",
    tech: "HTML, CSS, JS",
    github: "https://fb-bike.it",
    image: "/projects/fb-bike.jpg",
    status: "closed",
  },
  {
    slug: "donatos",
    name: "Donatos",
    tech: "Python, HTML, CSS, JS",
    github: "https://github.com/simofb21/Donatos",
    image: "/projects/donatos.jpg",
    status: "archived",
  },
];

export const statusEmoji: Record<ProjectStatus, string> = {
  "active-dev": "🚧",
  "active-done": "🟢",
  archived: "📦",
  closed: "🔴",
};

export const socialLinks = [
  { label: "GitHub", url: "https://github.com/simofb21", handle: "@simofb21" },
  {
    label: "Best-Ride",
    url: "https://best-ride.vercel.app",
    handle: "best-ride.vercel.app",
  },
  // Aggiungi qui eventuali altri profili (LinkedIn, Strava, Instagram, Email...)
];

export const cyclingPhotos = [
  "/cycling/bici1.jpg",
  "/cycling/bici2.jpg",
  "/cycling/bici3.jpg",
  "/cycling/bici4.jpg",
  "/cycling/bici5.jpg",
];
