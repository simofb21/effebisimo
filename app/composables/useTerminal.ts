import { projectsList } from "~/data/content";

export type OutputType =
  | "neofetch"
  | "help"
  | "dirs"
  | "project-detail"
  | "whoami"
  | "links"
  | "cycling"
  | "text"
  | "error";

export interface Line {
  id: number;
  cmd: string;
  type: OutputType;
  key?: string;
  params?: Record<string, string>;
}

export function useTerminal() {
  const { setLocale } = useI18n();
  function cmdNeofetch(input: string) {
    push(input, "neofetch");
  }
  const lines = ref<Line[]>([]);
  const history: string[] = [];
  let histIdx = 0;
  let id = 0;

  const push = (
    cmd: string,
    type: OutputType,
    key?: string,
    params?: Record<string, string>,
  ) => lines.value.push({ id: id++, cmd, type, key, params });

  // ==========================================
  // 1. FUNZIONI DEI SINGOLI COMANDI
  // ==========================================

  function cmdMan(input: string) {
    push(input, "help");
  }

  function cmdWhoami(input: string) {
    push(input, "whoami");
  }
  function cmdColor(input: string, args: string[]) {
    if (import.meta.client) {
      const root = document.documentElement;
      const arg = args[0]?.toLowerCase();

      if (arg === "light") {
        root.classList.add("theme-light");
      } else if (arg === "dark") {
        root.classList.remove("theme-light");
      } else {
        root.classList.toggle("theme-light");
      }

      const isLight = root.classList.contains("theme-light");
      push(input, "text", isLight ? "color.light" : "color.dark");
    }
  }

  function cmdPaolinux(input: string) {
    push(input, "text", "actions.paolinux");
    if (import.meta.client) {
      // 1. Apre subito il primo link al press di Invio
      window.open(
        "https://www.youtube.com/shorts/Sza9yRoEkXE",
        "_blank",
        "noopener,noreferrer",
      );

      // 2. Appena l'utente clicca o preme un tasto tornando sul terminale, apre il secondo!
      const openSecond = () => {
        window.open(
          "https://www.youtube.com/watch?v=_48FgdsEgoo&list=RD_48FgdsEgoo&start_radio=1",
          "_blank",
          "noopener,noreferrer",
        );
        window.removeEventListener("click", openSecond);
        window.removeEventListener("keydown", openSecond);
      };

      setTimeout(() => {
        window.addEventListener("click", openSecond, { once: true });
        window.addEventListener("keydown", openSecond, { once: true });
      }, 300);
    }
  }
  function cmdGimmeCv(input: string) {
    push(input, "text", "actions.cv_downloaded");
    if (import.meta.client) {
      const link = document.createElement("a");
      link.href = "/cv.jpeg";
      link.download = "CV_Simone.jpeg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  function cmdBestRide(input: string) {
    push(input, "text", "actions.best_ride_opened");
    if (import.meta.client) {
      window.open(
        "https://best-ride.vercel.app",
        "_blank",
        "noopener,noreferrer",
      );
    }
  }

  function cmdProjects(input: string, args: string[]) {
    const query = args.join("-").replace(/^-+/, "").toLowerCase();
    if (!query) {
      push(input, "dirs");
      return;
    }

    const found = projectsList.find(
      (p) =>
        p.slug === query ||
        p.name.toLowerCase() === args.join(" ").toLowerCase(),
    );

    if (found) {
      push(input, "project-detail", undefined, { slug: found.slug });
    } else {
      push(input, "error", "errors.projectNotFound", { name: args.join(" ") });
    }
  }

  function cmdLinks(input: string) {
    push(input, "links");
  }

  function cmdCycling(input: string) {
    push(input, "cycling");
  }

  async function cmdLang(input: string, args: string[]) {
    const l = args[0]?.toLowerCase();
    if (l === "it" || l === "en") {
      await setLocale(l);
      push(input, "text", "lang.changed");
    } else {
      push(input, "text", "lang.usage");
    }
  }

  function cmdClear() {
    lines.value = [];
  }

  // ==========================================
  // 2. REGISTRO DEI COMANDI
  // ==========================================

  const commandMap: Record<
    string,
    (input: string, args: string[]) => void | Promise<void>
  > = {
    fastfetch: (input) => cmdNeofetch(input),
    neofetch: (input) => cmdNeofetch(input),
    man: (input) => cmdMan(input),
    whoami: (input) => cmdWhoami(input),
    gimme_cv: (input) => cmdGimmeCv(input),
    "best-ride": (input) => cmdBestRide(input),
    projects: (input, args) => cmdProjects(input, args),
    links: (input) => cmdLinks(input),
    cycling: (input) => cmdCycling(input),
    color: (input, args) => cmdColor(input, args), // <-- NUOVO COMANDO
    lang: (input, args) => cmdLang(input, args),
    clear: () => cmdClear(),
    paolinux: (input) => cmdPaolinux(input), //POL?
  };

  // ==========================================
  // 3. ESECUZIONE E AUTOCOMPLETAMENTO
  // ==========================================

  async function run(raw: string) {
    const input = raw.trim();
    if (!input) return;
    history.push(input);
    histIdx = history.length;

    const [name = "", ...args] = input.split(/\s+/);
    const cmd = name.toLowerCase();

    const handler = commandMap[cmd];
    if (handler) {
      await handler(input, args);
    } else {
      push(input, "error", "errors.notFound", { cmd: name });
    }
  }

  function complete(value: string) {
    const trimmed = value.trimStart();
    // Autocompletamento per "projects [nome_progetto]"
    if (trimmed.toLowerCase().startsWith("projects ")) {
      const partial = trimmed.slice(9).toLowerCase();
      const matches = projectsList
        .map((p) => p.slug)
        .filter((s) => s.startsWith(partial));
      return matches.length === 1 ? `projects ${matches[0]}` : value;
    }

    // Autocompletamento comandi base
    const names = Object.keys(commandMap);
    const m = names.filter((n) => n.startsWith(trimmed.toLowerCase()));
    return m.length === 1 ? m[0] : value;
  }

  function navigate(dir: -1 | 1) {
    histIdx = Math.min(Math.max(histIdx + dir, 0), history.length);
    return history[histIdx] ?? "";
  }

  return { lines, run, complete, navigate };
}
