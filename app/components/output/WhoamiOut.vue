<script setup lang="ts">
import ShellImage from "./ShellImage.vue";
const { t } = useI18n();

const sections = ["cycling", "cs", "education", "work", "passions", "other"];
</script>

<template>
  <div class="out whoami-grid">
    <div class="whoami-photo">
      <ShellImage src="/me.jpg" alt="Simone" caption="visitor@fb.simo" />
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
