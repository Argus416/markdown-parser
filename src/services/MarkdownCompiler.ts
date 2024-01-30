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
    // return textBetweenPrefix(/\*\*(.*?)\*\*/g, '**', text, 'strong')
    return textBetweenPrefix({
      regex: /\*\*(.*?)\*\*/g,
      prefix: '**',
      text,
      baliseHtml: 'strong',
    })
  }

  private toItalique(text: string) {
    return textBetweenPrefix({
      regex: /\*(.*?)\*/g,
      prefix: '*',
      text,
      baliseHtml: 'em',
    })
  }

  private toStrikethrough(text: string) {
    return textBetweenPrefix({
      regex: /~~(.*?)~~/g,
      prefix: '~~',
      text,
      baliseHtml: 's',
    })
  }

  private toHighlighted(text: string) {
    return textBetweenPrefix({
      regex: /==(.*?)==/g,
      prefix: '==',
      text,
      baliseHtml: 'span',
      classHtml: 'bg-yellow-200',
    })
  }

  private toBoldAndItalique(text: string) {
    return textBetweenPrefix({
      regex: /===(.*?)===/g,
      prefix: '===',
      text,
      baliseHtml: 'span',
    })
  }

  private toQuote(text: string) {
    return textBetweenPrefix({
      regex: /^>(.*)/g,
      prefix: '>',
      text,
      baliseHtml: 'p',
      classHtml: 'border border-l-2 border-l-gray-500 ps-4 ms-4 text-gray-500',
      uniqueReplace: true,
    })
  }

  private toList(text: string) {
    return textBetweenPrefix({
      regex: /^-.*$/,
      prefix: '-',
      text,
      baliseHtml: 'li',
      uniqueReplace: true,
    })
  }

  private toCode(text: string) {
    return textBetweenPrefix({
      regex: /^``(.*)/g,
      prefix: '``',
      text,
      baliseHtml: 'pre',
    })
  }

  private toImage(text: string) {
    const match = text.match(/!\[([^\]]+)\]\(([^)]+)\)/)
    if (!match) return text

    const [, attribute, src] = match

    return `<img alt=${attribute} src=${src} class="bg-white" />`
  }

  private toLink(text: string) {
    const match = text.match(/\[([^\]]+)\]\(([^)]+)\)/)
    if (!match) return text

    const [, content, href] = match

    return `<a href=${href} class="bg-white" target="_blank">${content}</a>`
  }

  private toLine(text: string) {
    const match = text.match(/^---$/g)
    if (!match) return text

    return `<div class="w-full h-0.5 my-4 bg-red-200"></div>`
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
        text = this.toCode(text)
        text = this.toImage(text)
        text = this.toLink(text)
        text = this.toLine(text)
        text = this.toParagraphe(text)
        return text
      })
      .join('\n')

    return this.result
  }
}

export default MarkdownCompiler
