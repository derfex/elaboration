import { ChangeDetectionStrategy, Component, computed, input, type OnInit, signal } from '@angular/core'
import type { DXSkill } from '~entities/dx-skills/dx-skills.type'
import { dxSkills } from '~integrator/data-access/data/dx-skills/dx-skills.data'
import { DXSkillsComponent } from '~ui/dx-skills/dx-skills/dx-skills.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DXSkillsComponent],
  selector: 'app-dx-skills-section',
  styleUrl: './dx-skills-section.component.sass',
  templateUrl: './dx-skills-section.component.html',
})
export class DXSkillsSectionComponent implements OnInit {
  public readonly number = input.required<number>()

  protected readonly numberText = computed<string>(() => ('' + this.number()).padStart(2, '0'))
  protected readonly sectionParameters = signal({
    descriptionText: 'No data',
    skills: [] as readonly DXSkill[],
    titleText: 'No data',
  })

  public ngOnInit(): void {
    this.sectionParameters.set({
      descriptionText: 'The main technologies and tools that I own.',
      skills: dxSkills,
      titleText: 'Skills',
    } as const)
  }
}
