<script setup lang="ts">
const { t } = useI18n();

const asciiName = [
  "  ███████╗██╗███╗   ███╗ ██████╗ ",
  "  ██╔════╝██║████╗ ████║██╔═══██╗",
  "  ███████╗██║██╔████╔██║██║   ██║",
  "  ╚════██║██║██║╚██╔╝██║██║   ██║",
  "  ███████║██║██║ ╚═╝ ██║╚██████╔╝",
  "  ╚══════╝╚═╝╚═╝     ╚═╝ ╚═════╝ ",
  "  ███████╗██╗   ██╗███████╗ █████╗ ██████╗ ",
  "  ██╔════╝██║   ██║██╔════╝██╔══██╗██╔══██╗",
  "  █████╗  ██║   ██║███████╗███████║██████╔╝",
  "  ██╔══╝  ██║   ██║╚════██║██╔══██║██╔══██╗",
  "  ██║     ╚██████╔╝███████║██║  ██║██║  ██║",
  "  ╚═╝      ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝",
  "                                           ",
  "          [ user: simofusar ]              ",
];

const sections = ["cycling", "cs", "education", "work", "passions", "other"];
</script>

<template>
  <div class="out whoami-grid">
    <div class="whoami-photo">
      <div class="shell-img-box ascii-box">
        <div class="shell-img-bar">
          <span>+--[ identity: simofusar ]</span>
          <span class="shell-img-dots">[-][x]</span>
        </div>
        <pre
          class="whoami-ascii-art"
        ><code><span v-for="(row, idx) in asciiName" :key="idx">{{ row }}
</span></code></pre>
      </div>
    </div>

    <div class="whoami-text">
      <h1 class="whoami-h1"># {{ t("whoami.h1") }}</h1>
      <p class="whoami-intro">{{ t("whoami.intro") }}</p>

      <div v-for="sec in sections" :key="sec" class="whoami-section">
        <h2 class="whoami-h2">## {{ t(`whoami.sections.${sec}.title`) }}</h2>
        <p class="whitespace-pre">
          {{ t(`whoami.sections.${sec}.body`) }}
          <a
            v-if="sec === 'work'"
            href="mailto:simofusar@gmail.com"
            class="shell-link"
          >
            simofusar@gmail.com
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
