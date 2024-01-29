export function textBetweenPrefix(
  regex: RegExp,
  prefix: string,
  text: string,
  baliseHtml: string,
  classHtml: string = ''
): string {
  const match = text.match(regex)
  if (!match) return text

  match.forEach((m: string) => {
    let formatted = m.replace(prefix, '').trim()
    if (prefix !== '>') {
      formatted = m.replaceAll(prefix, '').trim()
    }
    text = text.replaceAll(
      m,
      `<${baliseHtml} class="${classHtml}">${formatted}</${baliseHtml}>`
    )
  })

  return text
}
