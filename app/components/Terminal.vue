<script setup lang="ts">
import { projectsList } from "~/data/content";
import NeofetchOut from "./output/NeoFetchOut.vue";
import ProjectDetailOut from "./output/ProjectDetailOut.vue";
import WhoamiOut from "./output/WhoamiOut.vue";
import LinksOut from "./output/LinksOut.vue";
import CyclingOut from "./output/CyclingOut.vue";

const { t } = useI18n();
const { lines, run, complete, navigate } = useTerminal();
const input = ref("");
const inputEl = ref<HTMLInputElement>();
const typing = ref(true);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const helpItems = [
  "whoami",
  "gimme_cv",
  "projects",
  "best-ride",
  "links",
  "cycling",
  "lang",
  "clear",
];

async function typeAndRun(cmdText: string, speed = 70) {
  for (const ch of cmdText) {
    input.value += ch;
    await sleep(speed);
  }
  await sleep(220);
  await run(input.value);
  input.value = "";
}

onMounted(async () => {
  await sleep(300);
  // 1. Esegue fastfetch in stile Arch Linux all'apertura
  await typeAndRun("fastfetch", 45);
  await sleep(650);
  // 2. Digita ed esegue man
  await typeAndRun("man", 90);

  typing.value = false;
  await nextTick();
  inputEl.value?.focus();
});

watch(
  () => lines.value.length,
  async () => {
    await nextTick();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  },
);

function submit() {
  if (typing.value) return;
  run(input.value);
  input.value = "";
  inputEl.value?.focus();
}

function runQuickCommand(cmdText: string) {
  if (typing.value) return;
  run(cmdText);
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Enter") submit();
  else if (e.key === "Tab") {
    e.preventDefault();
    input.value = complete(input.value);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    input.value = navigate(-1);
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    input.value = navigate(1);
  } else if (e.key === "l" && e.ctrlKey) {
    e.preventDefault();
    run("clear");
  }
}
</script>

<template>
  <main class="term" @click="inputEl?.focus()">
    <div v-for="l in lines" :key="l.id" class="block">
      <div class="prompt">
        <span class="user">visitor@fb.simo</span>:<span class="path">~</span>$
        {{ l.cmd }}
      </div>

      <!-- ARCH FASTFETCH / NEOFETCH -->
      <NeofetchOut v-if="l.type === 'neofetch'" />

      <!-- MAN / HELP -->
      <div v-else-if="l.type === 'help'" class="out">
        <p>{{ t("help.title") }}</p>
        <div v-for="c in helpItems" :key="c" class="row">
          <span class="cmd clickable" @click.stop="runQuickCommand(c)">{{
            c
          }}</span>
          <span>{{ t(`help.${c}`) }}</span>
        </div>
      </div>

      <!-- ELENCO PROGETTI -->
      <div v-else-if="l.type === 'dirs'" class="out">
        <div class="dirs">
          <span
            v-for="p in projectsList"
            :key="p.slug"
            class="dir clickable"
            @click.stop="runQuickCommand(`projects ${p.slug}`)"
          >
            {{ p.slug }}/
          </span>
        </div>
        <p class="dim">{{ t("projects.hint") }}</p>
      </div>

      <!-- DETTAGLIO SINGOLO PROGETTO -->
      <ProjectDetailOut
        :slug="l.params?.slug ?? ''"
        v-else-if="l.type === 'project-detail'"
      />

      <!-- WHOAMI -->
      <WhoamiOut v-else-if="l.type === 'whoami'" />

      <!-- LINKS -->
      <LinksOut v-else-if="l.type === 'links'" />

      <!-- CYCLING -->
      <CyclingOut v-else-if="l.type === 'cycling'" />

      <!-- ERRORI E TESTI SEMPLICI -->
      <div v-else-if="l.type === 'error'" class="out err whitespace-pre">
        {{ t(l.key ?? "", l.params ?? {}) }}
      </div>
      <div v-else class="out whitespace-pre">
        {{ t(l.key ?? "", l.params ?? {}) }}
      </div>
    </div>

    <!-- RIGA DI INPUT -->
    <div class="prompt">
      <span class="user">visitor@fb.simo</span>:<span class="path">~</span>$
      <span class="field">
        <input
          ref="inputEl"
          v-model="input"
          :readonly="typing"
          :style="{ width: Math.max(input.length + 1, 2) + 'ch' }"
          enterkeyhint="send"
          autocomplete="off"
          autocapitalize="off"
          autocorrect="off"
          spellcheck="false"
          aria-label="terminal input"
          @keydown="onKey"
        />
        <button
          v-if="input.length"
          class="send"
          type="button"
          aria-label="Send"
          @mousedown.prevent
          @click="submit"
        >
          ↵
        </button>
      </span>
    </div>
  </main>
</template>
