import type { DXProject, DXProjectCodename } from '~entities/dx-projects/dx-projects.type'

export interface DXProjectsListItem {
  readonly codename: DXProjectCodename
  readonly name: DXProject['name']
  readonly resultURL: DXProject['resultURL']
  readonly sourceURL: DXProject['sourceURL']
}
