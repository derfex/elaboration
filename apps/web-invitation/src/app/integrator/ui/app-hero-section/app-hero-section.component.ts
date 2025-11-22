import { ChangeDetectionStrategy, Component, type OnInit, signal } from '@angular/core'
import { LayoutHeroComponent } from '~ui-kit/layout/layout-hero/layout-hero.component'
import type { AppHeroSectionParameters } from '~ui/app-hero-section/app-hero-section.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LayoutHeroComponent],
  selector: 'app-hero-section',
  styleUrl: './app-hero-section.component.sass',
  templateUrl: './app-hero-section.component.html',
})
export class AppHeroSectionComponent implements OnInit {
  protected readonly sectionParameters = signal<AppHeroSectionParameters>({
    appealText: 'No data.',
    authorsSignatureLines: [],
    eventDateCaptionText: 'No data',
    eventDateValueText: 'No data',
    titleText: 'No data',
  })

  public ngOnInit(): void {
    this.sectionParameters.set({
      appealText: 'No data.',
      authorsSignatureLines: [],
      eventDateCaptionText: 'No data',
      eventDateValueText: 'No data',
      titleText: 'No data',
    })
  }
}
