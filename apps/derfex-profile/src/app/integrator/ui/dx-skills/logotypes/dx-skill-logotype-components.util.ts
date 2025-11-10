import { assertDefined } from '~app/dev/dev-error.util'
import type { DXSkillCodename } from '~entities/dx-skills/dx-skills.type'
import { AngularLogotypeComponent } from '~ui/dx-skills/logotypes/angular-logotype/angular-logotype.component'
import { CSSLogotypeComponent } from '~ui/dx-skills/logotypes/css-logotype/css-logotype.component'
import { GitLogotypeComponent } from '~ui/dx-skills/logotypes/git-logotype/git-logotype.component'
import { GitHubLogotypeComponent } from '~ui/dx-skills/logotypes/github-logotype/github-logotype.component'
import { HTML5LogotypeComponent } from '~ui/dx-skills/logotypes/html5-logotype/html5-logotype.component'
import { JavaScriptLogotypeComponent } from '~ui/dx-skills/logotypes/javascript-logotype/javascript-logotype.component'
import { NodeJSLogotypeComponent } from '~ui/dx-skills/logotypes/node-js-logotype/node-js-logotype.component'
import { RxJSLogotypeComponent } from '~ui/dx-skills/logotypes/rx-js-logotype/rx-js-logotype.component'
import { SASSLogotypeComponent } from '~ui/dx-skills/logotypes/sass-logotype/sass-logotype.component'
import { SVGLogotypeComponent } from '~ui/dx-skills/logotypes/svg-logotype/svg-logotype.component'
import { TypeScriptLogotypeComponent } from '~ui/dx-skills/logotypes/typescript-logotype/typescript-logotype.component'

export type DXSkillLogotypeComponentType =
  | typeof AngularLogotypeComponent
  | typeof CSSLogotypeComponent
  | typeof GitHubLogotypeComponent
  | typeof HTML5LogotypeComponent
  | typeof JavaScriptLogotypeComponent
  | typeof NodeJSLogotypeComponent
  | typeof TypeScriptLogotypeComponent

export class DXSkillLogotypeComponentsUtil {
  static readonly #logotypeComponentsMap: ReadonlyMap<DXSkillCodename, DXSkillLogotypeComponentType> = new Map<
    DXSkillCodename,
    DXSkillLogotypeComponentType
  >([
    ['Angular' as DXSkillCodename, AngularLogotypeComponent],
    ['CSS' as DXSkillCodename, CSSLogotypeComponent],
    ['Git' as DXSkillCodename, GitLogotypeComponent],
    ['GitHub' as DXSkillCodename, GitHubLogotypeComponent],
    ['HTML5' as DXSkillCodename, HTML5LogotypeComponent],
    ['JS' as DXSkillCodename, JavaScriptLogotypeComponent],
    ['NodeJS' as DXSkillCodename, NodeJSLogotypeComponent],
    ['RxJS' as DXSkillCodename, RxJSLogotypeComponent],
    ['SASS' as DXSkillCodename, SASSLogotypeComponent],
    ['SVG' as DXSkillCodename, SVGLogotypeComponent],
    ['TS' as DXSkillCodename, TypeScriptLogotypeComponent],
  ])

  public static getComponent(dxSkillCodename: DXSkillCodename): DXSkillLogotypeComponentType {
    const logotypeComponent = this.#logotypeComponentsMap.get(dxSkillCodename)
    assertDefined<DXSkillLogotypeComponentType>(
      logotypeComponent,
      `[DXSkillLogotypeComponentsUtil] Component for '${dxSkillCodename}' \`DXSkillCodename\` does not exist.`,
    )
    return logotypeComponent
  }
}
