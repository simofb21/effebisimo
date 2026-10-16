<script setup lang="ts">
import { cyclingPhotos } from "~/data/content";
import ShellImage from "./ShellImage.vue";

const { t } = useI18n();
const scroller = ref<HTMLElement>();

function scrollGallery(dir: -1 | 1) {
  if (!scroller.value) return;
  scroller.value.scrollBy({ left: dir * 320, behavior: "smooth" });
}
</script>

<template>
  <div class="out cycling-section">
    <p class="cycling-quote">{{ t("cycling.description") }}</p>

    <div class="cycling-controls">
      <span class="dim">{{ t("cycling.scrollHint") }}</span>
      <div class="cycling-btns">
        <button type="button" class="term-btn" @click.stop="scrollGallery(-1)">
          [ &lt; ]
        </button>
        <button type="button" class="term-btn" @click.stop="scrollGallery(1)">
          [ &gt; ]
        </button>
      </div>
    </div>

    <div ref="scroller" class="cycling-carousel">
      <div
        v-for="(photo, idx) in cyclingPhotos"
        :key="photo"
        class="cycling-slide"
      >
        <ShellImage
          :src="photo"
          :alt="`Cycling ${idx + 1}`"
          :caption="`[${idx + 1}/${cyclingPhotos.length}] bici${idx + 1}.jpg`"
        />
      </div>
    </div>
  </div>
</template>
