import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout-section-separator',
  styleUrl: './layout-section-separator.component.sass',
  templateUrl: './layout-section-separator.component.html',
})
export class LayoutSectionSeparatorComponent {}
