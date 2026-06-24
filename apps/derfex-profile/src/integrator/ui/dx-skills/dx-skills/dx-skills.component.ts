import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  type ElementRef,
  inject,
  input,
  linkedSignal,
  type OnInit,
  signal,
  viewChild,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { debounceTime, delay, distinctUntilChanged, Subject, tap } from 'rxjs'
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
  public readonly skillDetailsMinHeightForDeviceWidthExtraSmall = input.required<number>()
  public readonly skillDetailsMinHeightForDeviceWidthLarge = input.required<number>()
  public readonly skills = input.required<readonly DXSkill[]>()
  public readonly titleText = input.required<string>()

  protected readonly dxSkillDetailsContainerStyle = computed<string>(() => {
    return this.#prepareDXSkillDetailsContainerStyle(
      this.skillDetailsMinHeightForDeviceWidthExtraSmall(),
      this.skillDetailsMinHeightForDeviceWidthLarge(),
    )
  })
  protected readonly dxSkillDetailsContainerTransitionCSSClassIsApplied = signal(false)
  protected readonly skillDetails = computed<DXSkillDetailsForTemplate>(() => {
    return this.#prepareDXSkillDetails(this.#skillDetailsCodename(), this.#skillsMap())
  })
  protected readonly skillsSummaryForTemplate = computed<readonly DXSkillSummaryForTemplate[]>(() => {
    return this.skills().map(this.#prepareDXSkillForTemplate.bind(this))
  })

  readonly #skillDetailsTransition = new Subject<DXSkillCodename>()
  readonly #skillDetailsTransitionDebounceTime = 200
  // Should be equal to `$_skill-details-transition-duration: 100ms`.
  readonly #skillDetailsTransitionDuration = 100
  readonly #skillDetailsCodename = linkedSignal<DXSkillCodename>(() => {
    const [skill] = this.skills()
    return skill ? skill.codename : emptyDXSkillCodename
  })
  readonly #skillsMap = computed<DXSkillsReadonlyMap>(() => {
    return this.#prepareDXSkillsMap(this.skills())
  })

  private readonly dxSkillDetailsContainer =
    viewChild.required<ElementRef<HTMLDivElement>>('skillDetailsContainerElement')

  public ngOnInit(): void {
    this.#handleSkillDetailsTransition()
  }

  protected skillClickHandler(codename: DXSkillCodename): void {
    this.#replaceSkillDetails(codename)
  }

  // TODO: Investigate `protected skillMouseEnterHandler(codename: DXSkillCodename): void`.

  #handleSkillDetailsTransition(): void {
    this.#skillDetailsTransition
      .pipe(
        debounceTime(this.#skillDetailsTransitionDebounceTime),
        distinctUntilChanged(),
        tap((): void => this.dxSkillDetailsContainerTransitionCSSClassIsApplied.set(true)),
        delay(this.#skillDetailsTransitionDuration),
        tap((): void => this.dxSkillDetailsContainerTransitionCSSClassIsApplied.set(false)),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((codename: DXSkillCodename): void => {
        this.#skillDetailsCodename.set(codename)
        this.dxSkillDetailsContainer().nativeElement.scrollIntoView()
      })
  }

  #prepareDXSkillDetails(codename: DXSkillCodename, skillsMap: DXSkillsReadonlyMap): DXSkillDetailsForTemplate {
    const skill = skillsMap.get(codename)
    if (skill) {
      const {
        codename,
        name,
        proficiencyLevelDescription,
        proficiencyLevelListItems,
        referenceCaption,
        referenceURL,
        shortDescription,
      } = skill
      return {
        codename,
        logotypeComponent: DXSkillLogotypeComponentsUtil.getComponent(codename),
        name,
        proficiencyLevelDescription,
        proficiencyLevelListItems: [...proficiencyLevelListItems],
        referenceCaption,
        referenceURL,
        shortDescription,
      }
    }
    return {
      codename: emptyDXSkillCodename,
      logotypeComponent: DXSkillLogotypeComponentsUtil.getComponent('Angular' as DXSkillCodename),
      name: 'No data',
      proficiencyLevelDescription: 'No data.',
      proficiencyLevelListItems: [],
      referenceCaption: 'No data',
      referenceURL: 'NoData',
      shortDescription: 'No data.',
    }
  }

  #prepareDXSkillDetailsContainerStyle(
    minHeightForDeviceWidthExtraSmall: number,
    minHeightForDeviceWidthLarge: number,
  ): string {
    return [
      `--app-dx-skill-details-container--min-height--device-width-extra-small: ${minHeightForDeviceWidthExtraSmall}px`,
      `--app-dx-skill-details-container--min-height--device-width-large: ${minHeightForDeviceWidthLarge}px`,
    ].join(';')
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
          name,
          proficiencyLevelDescription,
          proficiencyLevelListItems,
          referenceCaption,
          referenceURL,
          shortDescription,
        }): [DXSkillCodename, DXSkill] => [
          codename,
          {
            codename,
            name,
            proficiencyLevelDescription,
            proficiencyLevelListItems: [...proficiencyLevelListItems],
            referenceCaption,
            referenceURL,
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
  readonly logotypeComponent: DXSkillLogotypeComponentType
  readonly name: DXSkill['name']
  readonly proficiencyLevelDescription: DXSkill['proficiencyLevelDescription']
  readonly proficiencyLevelListItems: DXSkill['proficiencyLevelListItems']
  readonly referenceCaption: DXSkill['referenceCaption']
  readonly referenceURL: DXSkill['referenceURL']
  readonly shortDescription: DXSkill['shortDescription']
}

interface DXSkillSummaryForTemplate {
  readonly codename: DXSkillCodename
  readonly logotypeComponent: DXSkillLogotypeComponentType
  readonly name: DXSkill['name']
}

type DXSkillsReadonlyMap = ReadonlyMap<DXSkillCodename, DXSkill>
