import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  type OnInit,
  signal,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { DXProjectsSectionMediatorService } from '~be/dx-projects/dx-projects-section-mediator.service'
import { LayoutSectionUtil } from '~ui-kit/layout/layout-section.util'
import type { DXProjectsSectionParametersAndList } from '~ui/dx-projects/dx-projects-section/dx-projects-section.type'
import { DXProjectsComponent } from '~ui/dx-projects/dx-projects/dx-projects.component'
import type { DXProjectsListItem } from '~ui/dx-projects/dx-projects/dx-projects.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DXProjectsComponent],
  selector: 'app-dx-projects-section',
  styleUrl: './dx-projects-section.component.sass',
  templateUrl: './dx-projects-section.component.html',
})
export class DXProjectsSectionComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #dxProjectsSectionMediatorService = inject(DXProjectsSectionMediatorService)

  public readonly number = input.required<number>()

  protected readonly numberText = computed<string>(() => LayoutSectionUtil.convertNumber(this.number()))
  protected readonly sectionParameters = signal({
    descriptionText: 'No data',
    emptyStateText: 'No data',
    projects: [] as readonly DXProjectsListItem[],
    resultTitleText: 'No data',
    sourceCodeTitleText: 'No data',
    titleText: 'No data',
  })

  public ngOnInit(): void {
    this.#dxProjectsSectionMediatorService
      .readSectionParametersAndList()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(({ list, sectionParameters }: DXProjectsSectionParametersAndList): void => {
        this.sectionParameters.set({
          descriptionText: sectionParameters.descriptionText,
          emptyStateText: sectionParameters.list.emptyStateText,
          projects: list,
          resultTitleText: sectionParameters.list.item.resultTitleText,
          sourceCodeTitleText: sectionParameters.list.item.sourceCodeTitleText,
          titleText: sectionParameters.titleText,
        })
      })
  }
}
