import { ChangeDetectionStrategy, Component, computed, input, type OnInit, signal } from '@angular/core'
import type { DXProjectCodename } from '~entities/dx-projects/dx-projects.type'
import { LayoutSectionUtil } from '~ui-kit/layout/layout-section.util'
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
    this.sectionParameters.set({
      descriptionText: 'Some of my projects are open source.',
      emptyStateText: 'No data',
      projects: [
        {
          codename: 'PetShop' as DXProjectCodename,
          name: 'Pet shop',
          resultURL: 'https://derfex.github.io/elaboration/apps/pet-shop/browser',
          sourceURL: 'https://github.com/derfex/elaboration/tree/master/apps/pet-shop',
        },
        {
          codename: 'TicTacToe' as DXProjectCodename,
          name: 'Tic-Tac-Toe',
          resultURL: 'https://derfex.github.io/pure-tasks/tic-tac-toe',
          sourceURL: 'https://github.com/derfex/pure-tasks/tree/master/tic-tac-toe',
        },
        {
          codename: 'checkIfTextsAreAnagrams' as DXProjectCodename,
          name: 'Anagrams',
          resultURL: 'https://derfex.github.io/pure-tasks/check-if-texts-are-anagrams',
          sourceURL: 'https://github.com/derfex/pure-tasks/tree/master/check-if-texts-are-anagrams',
        },
        {
          codename: 'OperatorTypeOf' as DXProjectCodename,
          name: '`typeof` operator',
          resultURL: 'https://derfex.github.io/experience/typeof',
          sourceURL: 'https://github.com/derfex/experience/tree/develop/typeof',
        },
        {
          codename: 'BinarySearch' as DXProjectCodename,
          name: 'Binary search',
          resultURL: 'https://derfex.github.io/pure-tasks/binary-search',
          sourceURL: 'https://github.com/derfex/pure-tasks/tree/master/binary-search',
        },
        {
          codename: 'SVGAndTransitions' as DXProjectCodename,
          name: 'SVG & transitions',
          resultURL: 'https://derfex.github.io/pure-tasks/svg-chart',
          sourceURL: 'https://github.com/derfex/pure-tasks/tree/master/svg-chart',
        },
      ],
      resultTitleText: 'Result',
      sourceCodeTitleText: 'Source code',
      titleText: 'Projects',
    } as const)
  }
}
