import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LayoutHeaderComponent } from '~ui-kit/layout/layout-header/layout-header.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LayoutHeaderComponent],
  selector: 'app-header-section',
  styleUrl: './header-section.component.sass',
  templateUrl: './header-section.component.html',
})
export class HeaderSectionComponent {}
