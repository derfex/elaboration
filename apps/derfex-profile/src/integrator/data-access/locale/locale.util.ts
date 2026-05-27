export class LocaleUtil {
  public static getPeriodTextWithENLocalization(start: string, end: string | null): string {
    const presentText = 'present'
    return `${start} – ${end ?? presentText}`
  }

  public static getPeriodTextWithRULocalization(start: string, end: string | null): string {
    const presentText = 'настоящее время'
    return `${start} — ${end ?? presentText}`
  }
}
