import { ChangeDetectionStrategy, Component, type OnInit, signal } from '@angular/core'
import { GoogleFormComponent } from '~ui/guest-questionnaire/google-form/google-form.component'
import type { GuestQuestionnaireSectionParameters } from '~ui/guest-questionnaire/guest-questionnaire-section/guest-questionnaire-section.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GoogleFormComponent],
  selector: 'app-guest-questionnaire-section',
  styleUrl: './guest-questionnaire-section.component.sass',
  templateUrl: './guest-questionnaire-section.component.html',
})
export class GuestQuestionnaireSectionComponent implements OnInit {
  protected readonly sectionParameters = signal<GuestQuestionnaireSectionParameters>({
    descriptionParagraphList: [],
    googleFormHeight: 0,
    googleFormURL: 'NoData',
    titleText: 'No data',
  })

  public ngOnInit(): void {
    this.sectionParameters.set({
      descriptionParagraphList: [],
      googleFormHeight: 0,
      googleFormURL: 'NoData',
      titleText: 'No data',
    })
  }
}
