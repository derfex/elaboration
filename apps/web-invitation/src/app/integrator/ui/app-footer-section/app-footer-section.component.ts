import { ChangeDetectionStrategy, Component, type OnInit, signal } from '@angular/core'
import { LayoutFooterComponent } from '~ui-kit/layout/layout-footer/layout-footer.component'
import type { AppFooterSectionParameters } from '~ui/app-footer-section/app-footer-section.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LayoutFooterComponent],
  selector: 'app-footer-section',
  styleUrl: './app-footer-section.component.sass',
  templateUrl: './app-footer-section.component.html',
})
export class AppFooterSectionComponent implements OnInit {
  protected readonly sectionParameters = signal<AppFooterSectionParameters>({
    carefullyCraftedWithText: 'No data',
  })

  public ngOnInit(): void {
    this.sectionParameters.set({
      carefullyCraftedWithText: 'No data',
    })
  }
}
