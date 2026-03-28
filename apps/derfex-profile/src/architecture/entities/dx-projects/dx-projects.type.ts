import type { Brand } from '../../brand-type.util'

export interface DXProject {
  readonly codename: DXProjectCodename
  readonly name: string
  readonly resultURL: string
  readonly sourceURL: string
}

export type DXProjectCodename = Brand<string, 'dx project codename'>
