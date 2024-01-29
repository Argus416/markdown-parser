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
    const [prefix] = text.split(' ')
    const hashRegex = /^#+$/
    const isTitle = hashRegex.test(prefix)
    if (!isTitle) return text

    const titleLvl = prefix.length
    return `<h${titleLvl} className='h${titleLvl}'>${text}</h${titleLvl}>`
  }

  run() {
    const texts = this.toArrayList() as string[]

    this.result = texts!
      .map((text: string) => {
        return this.toTitle(text)
      })
      .join('\n')

    console.log({ e: this.result })
    return this.result
  }
}

export default MarkdownCompiler
