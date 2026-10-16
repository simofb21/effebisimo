<script setup lang="ts">
import { projects } from '~/data/content'

const { t } = useI18n()
const { lines, run, complete, navigate } = useTerminal()
const input = ref('')
const inputEl = ref<HTMLInputElement>()
const typing = ref(true)
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

const helpItems = ['whoami', 'gimme_cv', 'projects', 'best-ride', 'links', 'cycling', 'lang', 'clear']

onMounted(async () => {
  await sleep(700)
  for (const ch of 'man') { input.value += ch; await sleep(90) }
  await sleep(350)
  run(input.value)
  input.value = ''
  typing.value = false
  await nextTick()
  inputEl.value?.focus()
})

watch(() => lines.value.length, async () => {
  await nextTick()
  window.scrollTo({ top: document.body.scrollHeight })
})
function submit() {
  if (typing.value) return
  run(input.value)
  input.value = ''
  inputEl.value?.focus()
}
function onKey(e: KeyboardEvent) {
if (e.key === 'Enter') submit()
 else if (e.key === 'Tab') { e.preventDefault(); input.value = complete(input.value) }
  else if (e.key === 'ArrowUp') { e.preventDefault(); input.value = navigate(-1) }
  else if (e.key === 'ArrowDown') { e.preventDefault(); input.value = navigate(1) }
  else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); run('clear') }
}
</script>

<template>
  <main class="term" @click="inputEl?.focus()">
    <div v-for="l in lines" :key="l.id" class="block">
      <div class="prompt"><span class="user">visitor@fb.simo</span>:<span class="path">~</span>$ {{ l.cmd }}</div>

      <div v-if="l.type === 'help'" class="out">
        <p>{{ t('help.title') }}</p>
        <div v-for="c in helpItems" :key="c" class="row">
          <span class="cmd">{{ c }}</span><span>{{ t(`help.${c}`) }}</span>
        </div>
      </div>

      <div v-else-if="l.type === 'dirs'" class="out">
        <div class="dirs"><span v-for="p in projects" :key="p" class="dir">{{ p }}/</span></div>
        <p class="dim">{{ t('projects.hint') }}</p>
      </div>

    <div v-else-if="l.type === 'error'" class="out err">{{ t(l.key!, l.params ?? {}) }}</div>
    <div v-else class="out">{{ t(l.key!, l.params ?? {}) }}</div>
    </div>

   <div class="prompt">
  <span class="user">visitor@fb.simo</span>:<span class="path">~</span>$
  <span class="field">
    <input
      ref="inputEl" v-model="input" :readonly="typing"
      :style="{ width: input.length + 1 + 'ch' }"
      enterkeyhint="send"
      autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
      aria-label="terminal input" @keydown="onKey"
    />
    <button
      v-if="input.length" class="send" type="button" aria-label="Send"
      @mousedown.prevent @click="submit"
    >↵</button>
  </span>
</div>
  </main>
</template>