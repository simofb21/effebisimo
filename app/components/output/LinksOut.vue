<script setup lang="ts">
import { socialLinks } from "~/data/content";
const { t } = useI18n();
</script>

<template>
  <div class="out">
    <p class="dim">{{ t("links.title") }}</p>
    <div class="links-list">
      <div v-for="item in socialLinks" :key="item.label" class="link-row">
        <span class="link-label">[{{ item.label }}]</span>
        <a
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="shell-link"
        >
          {{ item.handle }} ↗
        </a>
      </div>
    </div>
  </div>
</template>
