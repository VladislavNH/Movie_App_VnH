export default function truncateText(text, maxLength) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  const txt = text.slice(0, maxLength)
  const idx = txt.lastIndexOf(' ')
  return idx > 0 ? txt.slice(0, idx) + '…' : txt + '…'
}
