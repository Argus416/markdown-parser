import { textBetweenPrefix } from '@/helpers'

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

    const formattedText = `<h${titleLvl} className='h${titleLvl}'>${restOfText}</h${titleLvl}>`
    return formattedText
  }
  private toParagraphe(text: string) {
    const isBalised = text.indexOf('<') === 0
    if (isBalised) return text

    return `<p>${text}</p>`
  }

  private toBold(text: string) {
    return textBetweenPrefix(/\*\*(.*?)\*\*/g, '**', text, 'strong')
  }

  private toItalique(text: string) {
    return textBetweenPrefix(/\*(.*?)\*/g, '*', text, 'em')
  }

  private toStrikethrough(text: string) {
    return textBetweenPrefix(/~~(.*?)~~/g, '~~', text, 's')
  }

  private toHighlighted(text: string) {
    return textBetweenPrefix(/==(.*?)==/g, '==', text, 'span', 'bg-yellow-200')
  }

  private toBoldAndItalique(text: string) {
    return textBetweenPrefix(
      /===(.*?)===/g,
      '===',
      text,
      'span',
      'bg-yellow-200'
    )
  }

  private toQuote(text: string) {
    return textBetweenPrefix(
      /^>(.*)/g,
      '>',
      text,
      'p',
      'border border-l-2 border-l-gray-500 ps-4 ms-4 text-gray-500'
    )
  }

  private toList(text: string) {
    return textBetweenPrefix(/^-(.*)/g, '-', text, 'li')
  }
  run() {
    const texts = this.toArrayList() as string[]

    this.result = texts!
      .map((text: string) => {
        text = this.toTitle(text)
        text = this.toBold(text)
        text = this.toItalique(text)
        text = this.toHighlighted(text)
        text = this.toStrikethrough(text)
        text = this.toBoldAndItalique(text)
        text = this.toQuote(text)
        text = this.toList(text)

        text = this.toParagraphe(text)
        return text
      })
      .join('\n')

    return this.result
  }
}

export default MarkdownCompiler
