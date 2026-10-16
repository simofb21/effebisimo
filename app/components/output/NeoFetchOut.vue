<script setup lang="ts">
const asciiArt = [
  " ",
  "  ******    ******** ",
  "  **    **   **     **",
  "  **         **     **",
  "  ******     ******** ",
  "  **         **     **",
  "  **         **     **",
  "  **         ******** ",
  " ",
];
const specs = [
  { key: "OS", val: "PAOLINUX X_86" },
  { key: "Host", val: "Simone Fusar Bassini" },
  { key: "Kernel", val: "UniMi-CS-1.0-student" },
  { key: "Uptime", val: "19+ years (Cycling & Coding)" },
  { key: "Packages", val: "8 (projects), 5 (links)" },
  { key: "Shell", val: "nuxt-sh 3.x" },
  { key: "WM", val: "Best-Ride AI Engine" },
  { key: "Terminal", val: "fb.simo" },
];
</script>

<template>
  <div class="out neofetch-box">
    <pre class="neofetch-ascii" aria-hidden="true"><span
      v-for="(line, i) in asciiArt"
      :key="i"
      class="fade-line"
      :style="{ animationDelay: `${i * 18}ms` }"
    >{{ line }}
</span></pre>

    <div class="neofetch-info">
      <div class="neofetch-header fade-line">
        <span class="user">visitor</span>@<span class="user">fb.simo</span>
      </div>
      <div class="neofetch-sep fade-line">---------------</div>

      <div
        v-for="(s, idx) in specs"
        :key="s.key"
        class="neofetch-row fade-line"
        :style="{ animationDelay: `${(idx + 2) * 35}ms` }"
      >
        <span class="neofetch-key">{{ s.key }}</span
        >:
        <span class="neofetch-val">{{ s.val }}</span>
      </div>

      <div class="neofetch-colors fade-line" style="animation-delay: 380ms">
        <span class="c-blk"></span>
        <span class="c-red"></span>
        <span class="c-grn"></span>
        <span class="c-ylw"></span>
        <span class="c-blu"></span>
        <span class="c-mag"></span>
        <span class="c-cyn"></span>
        <span class="c-wht"></span>
      </div>
    </div>
  </div>
</template>
