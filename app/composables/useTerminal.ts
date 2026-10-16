import { projects } from '~/data/content'

export interface Line { id: number; cmd: string; type: 'help' | 'dirs' | 'text' | 'error'; payload?: string }

export function useTerminal() {
  const { t, setLocale } = useI18n()
  const lines = ref<Line[]>([])
  const history: string[] = []
  let histIdx = 0
  let id = 0

  const names = ['whoami', 'gimme_cv', 'projects', 'best-ride', 'links',
    'cycling', 'man', 'suggerimenti', 'lang', 'clear']

  const push = (cmd: string, type: Line['type'], payload?: string) =>
    lines.value.push({ id: id++, cmd, type, payload })

  function run(raw: string) {
    const input = raw.trim()
    if (!input) return
    history.push(input)
    histIdx = history.length
    const [name = '', ...args] = input.split(/\s+/)

    switch (name.toLowerCase()) {
      case 'man':
      case 'suggerimenti':
        push(input, 'help'); break
      case 'whoami':
      case 'gimme_cv':
      case 'best-ride':
      case 'links':
      case 'cycling':
        push(input, 'text', t(`placeholder.${name.toLowerCase()}`)); break
      case 'projects': {
        const slug = args[0]?.replace(/^-+/, '').toLowerCase()
        if (!slug) { push(input, 'dirs'); break }
        projects.includes(slug)
          ? push(input, 'text', t('projects.detail', { name: slug }))
          : push(input, 'error', t('errors.projectNotFound', { name: slug }))
        break
      }
      case 'lang': {
        const l = args[0]
        if (l === 'it' || l === 'en') { setLocale(l); push(input, 'text', t('lang.changed')) }
        else push(input, 'text', t('lang.usage'))
        break
      }
      case 'clear':
        lines.value = []; break
      default:
        push(input, 'error', t('errors.notFound', { cmd: name }))
    }
  }

  function complete(value: string) {
    const m = names.filter(n => n.startsWith(value.toLowerCase()))
    return m.length === 1 ? m[0] : value
  }

  function navigate(dir: -1 | 1) {
    histIdx = Math.min(Math.max(histIdx + dir, 0), history.length)
    return history[histIdx] ?? ''
  }

  return { lines, run, complete, navigate }
}