export class LocaleUtil {
  public static getPeriodTextWithENLocalization(start: Date, end: Date | null): string {
    const endText = end ? this.#getDateText(end) : 'present'
    return `${this.#getDateText(start)} – ${endText}`
  }

  public static getPeriodTextWithRULocalization(start: Date, end: Date | null): string {
    const endText = end ? this.#getDateText(end) : 'настоящее время'
    return `${this.#getDateText(start)} — ${endText}`
  }

  static #getDateText(date: Date): string {
    const month = (date.getMonth() + 1 + '').padStart(2, '0')
    return `${date.getFullYear()}-${month}`
  }
}
