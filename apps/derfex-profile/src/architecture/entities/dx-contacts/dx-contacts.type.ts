export interface DXContact {
  readonly codename: DXContactCodename
  readonly name: string
  readonly url: string
}

export const enum DXContactCodename {
  GitHub = 'github',
  LinkedIn = 'linkedin',
  Telegram = 'telegram',
}
