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

  private toStrong(text: string) {}
  run() {
    const texts = this.toArrayList() as string[]

    this.result = texts!
      .map((text: string) => {
        return this.toTitle(text)
      })
      .join('\n')

    // console.log({ e: this.result })
    return this.result
  }
}

export default MarkdownCompiler
