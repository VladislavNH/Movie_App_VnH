export default function truncateText(text, maxLength) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  const short = text.slice(0, maxLength)
  const idx = short.lastIndexOf(' ')
  return idx > 0 ? short.slice(0, idx) + '…' : short + '…'
}
