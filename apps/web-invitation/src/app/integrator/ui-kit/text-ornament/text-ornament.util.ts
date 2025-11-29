export class TextOrnamentUtil {
  public static generateTexts<Text extends string>(text: Text, count: number): readonly Text[] {
    return Array(count).fill(text)
  }
}
