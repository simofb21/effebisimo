<script setup lang="ts">
import { cyclingPhotos } from "~/data/content";
import ShellImage from "./ShellImage.vue";

const { t } = useI18n();
</script>

<template>
  <div class="out cycling-book">
    <div class="book-header">
      ==================================================<br />
      📖 {{ t("cycling.title") }}<br />
      ==================================================
    </div>

    <p class="book-intro">{{ t("cycling.intro") }}</p>

    <div
      v-for="(photo, index) in cyclingPhotos"
      :key="photo"
      class="book-chapter"
    >
      <div class="chapter-title">
        --- [ {{ t(`cycling.chapters.c${index + 1}.title`) }} ] ---
      </div>
      <p class="chapter-text">
        {{ t(`cycling.chapters.c${index + 1}.text`) }}
      </p>
      <ShellImage
        :src="photo"
        :alt="`Cycling photo ${index + 1}`"
        :caption="t(`cycling.chapters.c${index + 1}.caption`)"
      />
    </div>
  </div>
</template>
