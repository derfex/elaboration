import { newDevError } from '~app/dev/dev-error.util'
import type { DXSkillCodename } from '~entities/dx-skills/dx-skills.type'
import { AngularLogotypeComponent } from '~ui/dx-skills/logotypes/angular-logotype/angular-logotype.component'
import { CSSLogotypeComponent } from '~ui/dx-skills/logotypes/css-logotype/css-logotype.component'
import { GitHubLogotypeComponent } from '~ui/dx-skills/logotypes/github-logotype/github-logotype.component'
import { HTML5LogotypeComponent } from '~ui/dx-skills/logotypes/html5-logotype/html5-logotype.component'

export type DXSkillLogotypeComponentType =
  | typeof AngularLogotypeComponent
  | typeof CSSLogotypeComponent
  | typeof GitHubLogotypeComponent
  | typeof HTML5LogotypeComponent

export class DXSkillLogotypeComponentsUtil {
  static readonly #logotypeComponentsMap: ReadonlyMap<DXSkillCodename, DXSkillLogotypeComponentType> = new Map<
    DXSkillCodename,
    DXSkillLogotypeComponentType
  >([
    ['Angular' as DXSkillCodename, AngularLogotypeComponent],
    ['CSS' as DXSkillCodename, CSSLogotypeComponent],
    ['GitHub' as DXSkillCodename, GitHubLogotypeComponent],
    ['HTML5' as DXSkillCodename, HTML5LogotypeComponent],
    ['JS' as DXSkillCodename, AngularLogotypeComponent], // TODO: Replace.
    ['NodeJS' as DXSkillCodename, AngularLogotypeComponent], // TODO: Replace.
    ['TS' as DXSkillCodename, AngularLogotypeComponent], // TODO: Replace.
  ])

  public static getComponent(dxSkillCodename: DXSkillCodename): DXSkillLogotypeComponentType | never {
    const logotypeComponent = this.#logotypeComponentsMap.get(dxSkillCodename)
    if (!logotypeComponent) {
      throw newDevError(
        `[DXSkillLogotypeComponentsUtil] Component for '${dxSkillCodename}' \`DXSkillCodename\` does not exist.`,
      )
    }
    return logotypeComponent
  }
}
