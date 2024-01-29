class MarkdownCompiler {
  private text = '' as string
  public result = '' as string
  constructor(text: string) {
    this.text = text.trim()
    this.run()
    this.result
  }

  private toArrayList() {
    return this.text.split('\n')
  }

  private toTitle(text: string) {
    const match = text.match(/^(#+)\s+(.*)$/)

    if (!match) {
      return text
    }

    const [, hashPrefix, restOfText] = match
    const titleLvl = hashPrefix.length

    console.log({ restOfText })

    const formattedText = `<h${titleLvl} className='h${titleLvl}'>${restOfText}</h${titleLvl}>`
    return formattedText
  }
  private toStrong(text: string) {
    const match = text.match(/\*\*(.*?)\*\*/g)

    if (!match) return text

    match.forEach((m: string) => {
      const formatted = m.replaceAll('**', '').trim()
      text = text.replace(m, `<strong>${formatted}</strong>`)
    })

    return text
  }

  private toItalique(text: string) {
    const match = text.match(/\*(.*?)\*/g)

    if (!match) return text

    match.forEach((m: string) => {
      const formatted = m.replaceAll('*', '').trim()
      text = text.replace(m, `<em>${formatted}</em>`)
    })

    return text
  }

  private toParagraphe(text: string) {
    const isBalised = text.indexOf('<') === 0
    if (isBalised) return text

    return `<p>${text}</p>`
  }
  run() {
    const texts = this.toArrayList() as string[]

    this.result = texts!
      .map((text: string) => {
        text = this.toTitle(text)
        text = this.toStrong(text)
        text = this.toItalique(text)
        text = this.toParagraphe(text)
        return text
      })
      .join('\n')

    console.log(this.result)

    return this.result
  }
}

export default MarkdownCompiler
