export type ProjectStatus =
  | "active-dev"
  | "active-done"
  | "archived"
  | "closed";

export interface ProjectData {
  slug: string;
  name: string;
  tech: string;
  github?: string;
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
    status: "archived",
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
  {
    label: "Strava",
    url: "https://www.strava.com/athletes/53796838",
    handle: "Simone Fusar Bassini",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/simone-fusar-bassini-7407003b4/",
    handle: "Simone Fusar Bassini",
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/fb.simo_/",
    handle: "@fb.simo_",
  },
  {
    label: "GitHub",
    url: "https://github.com/simofb21",
    handle: "github.com/simofb21",
  },
  {
    label: "Email",
    url: "mailto:simofusar@gmail.com",
    handle: "simofusar@gmail.com",
  },
];

export const cyclingPhotos = [
  "/cycling/bici1.jpg",
  "/cycling/bici2.jpg",
  "/cycling/bici3.jpg",
  "/cycling/bici4.jpg",
  "/cycling/bici5.jpg",
];
