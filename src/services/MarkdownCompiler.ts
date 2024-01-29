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
    const [prefix, ...restOfText] = text.split(' ')
    const hashRegex = /^#+$/
    const isTitle = hashRegex.test(prefix)

    if (!isTitle) return text

    const titleLvl = prefix.length
    console.log({ restOfText })

    const formatText = restOfText.join(' ')
    return `<h${titleLvl} className='h${titleLvl}'>${formatText}</h${titleLvl}>`
  }

  private toStrong(text: string) {
    const match = text.match(/\*\*(.*?)\*\*/g)

    if (!match) return text

    match.forEach((m: string) => {
      const formatted = m.replaceAll('**', '').trim()
      console.log({ formatted })
      text = text.replace(m, `<strong>${formatted}</strong>`)
    })

    console.log({ text })
    return text
  }

  private toItalique(text: string) {
    const match = text.match(/\*(.*?)\*/g)

    if (!match) return text

    match.forEach((m: string) => {
      const formatted = m.replaceAll('*', '').trim()
      console.log({ formatted })
      text = text.replace(m, `<em>${formatted}</em>`)
    })

    console.log({ text })
    return text
  }
  run() {
    const texts = this.toArrayList() as string[]

    this.result = texts!
      .map((text: string) => {
        text = this.toTitle(text)
        text = this.toStrong(text)
        text = this.toItalique(text)
        return text
      })
      .join('\n')

    // console.log({ e: this.result })
    return this.result
  }
}

export default MarkdownCompiler
