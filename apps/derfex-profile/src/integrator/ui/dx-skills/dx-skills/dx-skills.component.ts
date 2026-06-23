import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  linkedSignal,
  type OnInit,
  signal,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { BehaviorSubject, debounceTime, delay, distinctUntilChanged, tap } from 'rxjs'
import type { DXSkill, DXSkillCodename } from '~entities/dx-skills/dx-skills.type'
import { DXSkillCardComponent } from '~ui/dx-skills/dx-skill-card/dx-skill-card.component'
import { DXSkillDetailsComponent } from '~ui/dx-skills/dx-skill-details/dx-skill-details.component'
import {
  DXSkillLogotypeComponentsUtil,
  type DXSkillLogotypeComponentType,
} from '~ui/dx-skills/logotypes/dx-skill-logotype-components.util'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgComponentOutlet,
    NgTemplateOutlet,

    // Provided by the app.
    DXSkillCardComponent,
    DXSkillDetailsComponent,
  ],
  selector: 'app-dx-skills',
  styleUrl: './dx-skills.component.sass',
  templateUrl: './dx-skills.component.html',
})
export class DXSkillsComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)

  public readonly descriptionText = input.required<string>()
  public readonly skillDetailsMinHeight = input.required<number>()
  public readonly skills = input.required<readonly DXSkill[]>()
  public readonly titleText = input.required<string>()

  protected readonly dxSkillDetailsContainerStyle = computed<string>(() => {
    return `min-height: ${this.skillDetailsMinHeight()}px`
  })
  protected readonly dxSkillDetailsContainerTransitionCSSClassIsApplied = signal(false)
  protected readonly skillDetails = computed<DXSkillDetailsForTemplate>(() => {
    return this.#prepareDXSkillDetails(this.#skillDetailsCodename(), this.#skillsMap())
  })
  protected readonly skillsSummaryForTemplate = computed<readonly DXSkillSummaryForTemplate[]>(() => {
    return this.skills().map(this.#prepareDXSkillForTemplate.bind(this))
  })

  readonly #dxSkillDetailsContainerTransitionDuration = 100
  readonly #skillDetailsTransition = new BehaviorSubject<DXSkillCodename>(emptyDXSkillCodename)
  readonly #skillDetailsCodename = linkedSignal<DXSkillCodename>(() => {
    const [skill] = this.skills()
    return skill ? skill.codename : emptyDXSkillCodename
  })
  readonly #skillsMap = computed<DXSkillsReadonlyMap>(() => {
    return this.#prepareDXSkillsMap(this.skills())
  })

  public ngOnInit(): void {
    this.#handleSkillDetailsTransition()
  }

  protected skillClickHandler(codename: DXSkillCodename): void {
    this.#replaceSkillDetails(codename)
  }

  protected skillMouseEnterHandler(codename: DXSkillCodename): void {
    this.#replaceSkillDetails(codename)
  }

  #handleSkillDetailsTransition(): void {
    this.#skillDetailsTransition
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((): void => this.dxSkillDetailsContainerTransitionCSSClassIsApplied.set(true)),
        delay(this.#dxSkillDetailsContainerTransitionDuration),
        tap((): void => this.dxSkillDetailsContainerTransitionCSSClassIsApplied.set(false)),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((codename: DXSkillCodename): void => {
        this.#skillDetailsCodename.set(codename)
      })
  }

  #prepareDXSkillDetails(codename: DXSkillCodename, skillsMap: DXSkillsReadonlyMap): DXSkillDetailsForTemplate {
    const skill = skillsMap.get(codename)
    if (skill) {
      const { codename, descriptionListItems, name, referenceURL, referenceURLText, shortDescription } = skill
      return {
        codename,
        descriptionListItems: [...descriptionListItems],
        logotypeComponent: DXSkillLogotypeComponentsUtil.getComponent(codename),
        name,
        referenceURL: referenceURL,
        referenceURLText: referenceURLText,
        shortDescription,
      }
    }
    return {
      codename: emptyDXSkillCodename,
      descriptionListItems: [],
      logotypeComponent: DXSkillLogotypeComponentsUtil.getComponent('Angular' as DXSkillCodename),
      name: 'No data',
      referenceURL: 'NoData',
      referenceURLText: 'No data',
      shortDescription: 'No data.',
    }
  }

  #prepareDXSkillForTemplate({ codename, name }: DXSkill): DXSkillSummaryForTemplate {
    return {
      codename,
      logotypeComponent: DXSkillLogotypeComponentsUtil.getComponent(codename),
      name,
    }
  }

  #prepareDXSkillsMap(skills: readonly DXSkill[]): DXSkillsReadonlyMap {
    return new Map<DXSkillCodename, DXSkill>(
      skills.map(
        ({
          codename,
          descriptionListItems,
          name,
          referenceURL,
          referenceURLText,
          shortDescription,
        }): [DXSkillCodename, DXSkill] => [
          codename,
          {
            codename,
            descriptionListItems: [...descriptionListItems],
            name,
            referenceURL,
            referenceURLText,
            shortDescription,
          },
        ],
      ),
    )
  }

  #replaceSkillDetails(codename: DXSkillCodename): void {
    this.#skillDetailsTransition.next(codename)
  }
}

const emptyDXSkillCodename = 'NoData' as DXSkillCodename

interface DXSkillDetailsForTemplate {
  readonly codename: DXSkillCodename
  readonly descriptionListItems: DXSkill['descriptionListItems']
  readonly logotypeComponent: DXSkillLogotypeComponentType
  readonly name: DXSkill['name']
  readonly referenceURL: DXSkill['referenceURL']
  readonly referenceURLText: DXSkill['referenceURLText']
  readonly shortDescription: DXSkill['shortDescription']
}

interface DXSkillSummaryForTemplate {
  readonly codename: DXSkillCodename
  readonly logotypeComponent: DXSkillLogotypeComponentType
  readonly name: DXSkill['name']
}

type DXSkillsReadonlyMap = ReadonlyMap<DXSkillCodename, DXSkill>
