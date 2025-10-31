import { ChangeDetectionStrategy, Component, type OnInit, signal } from '@angular/core'
import { LayoutHeroComponent } from '~ui-kit/layout/layout-hero/layout-hero.component'
import type { HeroSectionParameters } from '~ui/hero-section/hero-section.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LayoutHeroComponent],
  selector: 'app-hero-section',
  styleUrl: './hero-section.component.sass',
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent implements OnInit {
  protected readonly codename = 'HERO'
  protected readonly sectionParameters = signal<HeroSectionParameters>({
    contactGitHubURL: 'No data',
    contactTelegramURL: 'No data',
    nameText: 'No data',
    titleXML: 'No data',
  })

  public ngOnInit(): void {
    this.sectionParameters.set({
      contactGitHubURL: 'https://github.com/derfex',
      contactTelegramURL: 'https://t.me/dapolovnyov',
      nameText: 'Dmitry P.',
      titleXML: 'Your friendly neighborhood <highlight>software engineer</highlight> to help you develop your business!',
    })
  }
}
