import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dx-skills',
  styleUrl: './dx-skills.component.sass',
  templateUrl: './dx-skills.component.html',
})
export class DXSkillsComponent {}
