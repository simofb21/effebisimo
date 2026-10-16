<script setup lang="ts">
import { projectsList, statusEmoji } from "~/data/content";
import ShellImage from "./ShellImage.vue";

const props = defineProps<{ slug: string }>();
const { t } = useI18n();

const project = computed(() => projectsList.find((p) => p.slug === props.slug));
</script>

<template>
  <div v-if="project" class="out project-card">
    <div class="project-header">
      <span class="project-title">=== {{ project.name }} ===</span>
    </div>

    <div class="project-meta">
      <div>
        <span class="meta-label">{{ t("projects.labels.status") }}:</span>
        <span class="meta-val">
          {{ statusEmoji[project.status] }}
          {{ t(`projects.status.${project.status}`) }}
        </span>
      </div>

      <div>
        <span class="meta-label">{{ t("projects.labels.tech") }}:</span>
        <span class="meta-val">{{ project.tech }}</span>
      </div>

      <div>
        <span class="meta-label">{{ t("projects.labels.repo") }}:</span>
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="shell-link"
        >
          {{ project.github }} ↗
        </a>
        <span v-else class="dim">{{ t("projects.noSource") }}</span>
      </div>
    </div>

    <p class="project-desc">
      {{ t(`projects.items.${project.slug}.description`) }}
    </p>

    <ShellImage :src="project.image" :alt="project.name" />
  </div>
</template>
