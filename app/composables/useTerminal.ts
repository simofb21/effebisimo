import { projects } from "~/data/content";

export interface Line {
  id: number;
  cmd: string;
  type: "help" | "dirs" | "text" | "error";
  key?: string;
  params?: Record<string, string>;
}

export function useTerminal() {
  const { setLocale } = useI18n();
  const lines = ref<Line[]>([]);
  const history: string[] = [];
  let histIdx = 0;
  let id = 0;

  const names = [
    "whoami",
    "gimme_cv",
    "projects",
    "best-ride",
    "links",
    "cycling",
    "man",
    "lang",
    "clear",
  ];

  const push = (
    cmd: string,
    type: Line["type"],
    key?: string,
    params?: Record<string, string>,
  ) => lines.value.push({ id: id++, cmd, type, key, params });

  async function run(raw: string) {
    const input = raw.trim();
    if (!input) return;
    history.push(input);
    histIdx = history.length;
    const [name = "", ...args] = input.split(/\s+/);
    const cmd = name.toLowerCase();

    switch (cmd) {
      case "man":
        push(input, "help");
        break;
      case "whoami":
      case "gimme_cv": {
        push(input, "text", "actions.cv_downloaded");
        if (import.meta.client) {
          const link = document.createElement("a");
          link.href = "/cv.jpeg";
          link.download = "CV_Simone.jpeg"; // Puoi cambiare il nome con cui verrà salvato il file
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        break;
      }
      case "best-ride": {
        push(input, "text", "actions.best_ride_opened");
        if (import.meta.client) {
          window.open(
            "https://best-ride.vercel.app",
            "_blank",
            "noopener,noreferrer",
          );
        }
        break;
      }
      case "links":
      case "cycling":
        push(input, "text", `placeholder.${cmd}`);
        break;
      case "projects": {
        const slug = args[0]?.replace(/^-+/, "").toLowerCase();
        if (!slug) {
          push(input, "dirs");
          break;
        }
        projects.includes(slug)
          ? push(input, "text", "projects.detail", { name: slug })
          : push(input, "error", "errors.projectNotFound", { name: slug });
        break;
      }
      case "lang": {
        const l = args[0];
        if (l === "it" || l === "en") {
          await setLocale(l);
          push(input, "text", "lang.changed");
        } else {
          push(input, "text", "lang.usage");
        }
        break;
      }
      case "clear":
        lines.value = [];
        break;
      default:
        push(input, "error", "errors.notFound", { cmd: name });
    }
  }

  function complete(value: string) {
    const m = names.filter((n) => n.startsWith(value.toLowerCase()));
    return m.length === 1 ? m[0] : value;
  }

  function navigate(dir: -1 | 1) {
    histIdx = Math.min(Math.max(histIdx + dir, 0), history.length);
    return history[histIdx] ?? "";
  }

  return { lines, run, complete, navigate };
}
