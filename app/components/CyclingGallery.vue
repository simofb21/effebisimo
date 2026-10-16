<script setup lang="ts">
import { galleryImages } from '~/data/content'
const current = ref(0)
let timer: ReturnType<typeof setInterval>
onMounted(() => {
  timer = setInterval(() => (current.value = (current.value + 1) % galleryImages.length), 3000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="gallery">
    <Transition name="fade" mode="out-in">
      <img :key="current" :src="galleryImages[current]" alt="cycling" />
    </Transition>
    <div class="dots">
      <span v-for="(_, i) in galleryImages" :key="i" :class="{ on: i === current }" @click="current = i" />
    </div>
  </div>
</template>