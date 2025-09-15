export class LayoutSectionUtil {
  public static convertNumber(number: number): string {
    return ('' + number).padStart(2, '0')
  }
}
