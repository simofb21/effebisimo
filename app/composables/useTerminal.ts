import { projectsList } from "~/data/content";

export type OutputType =
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
    man: (input) => cmdMan(input),
    whoami: (input) => cmdWhoami(input),
    gimme_cv: (input) => cmdGimmeCv(input),
    "best-ride": (input) => cmdBestRide(input),
    projects: (input, args) => cmdProjects(input, args),
    links: (input) => cmdLinks(input),
    cycling: (input) => cmdCycling(input),
    lang: (input, args) => cmdLang(input, args),
    clear: () => cmdClear(),
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
