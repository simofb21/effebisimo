<script setup lang="ts">
defineProps<{
  src: string;
  alt: string;
  caption?: string;
}>();
</script>

<template>
  <figure class="shell-img-box">
    <div class="shell-img-bar">
      <span>+--[ img: {{ src }} ]</span>
      <span class="shell-img-dots">[-][x]</span>
    </div>
    <div class="shell-img-frame">
      <img :src="src" :alt="alt" loading="lazy" />
    </div>
    <figcaption v-if="caption" class="shell-img-caption">
      └─ {{ caption }}
    </figcaption>
  </figure>
</template>
