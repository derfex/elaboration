import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ui-kit-presentation',
  styleUrl: './ui-kit-presentation.component.sass',
  templateUrl: './ui-kit-presentation.component.html',
})
export class UIKitPresentationComponent {
  protected readonly descriptionText = 'Examples of the UI kit elements.'
  protected readonly titleText = 'UI kit presentation'

  protected readonly colorsSubsection = this.#generateColorsSubsection()
  protected readonly headingsSubsection = this.#generateHeadingsSubsection()

  #generateColorsSubsection(): ColorsSubsection {
    return {
      grayCards: this.#generateColorsSubsectionPrimitiveGrayCards(),
      title: 'Colors',
    }
  }

  #generateColorsSubsectionPrimitiveGrayCard(grayCode: string): ColorsSubsectionCard {
    return {
      cssClass: `app-js-colors__primitive-${grayCode}-card`,
      text: grayCode,
    }
  }

  #generateColorsSubsectionPrimitiveGrayCards(): readonly ColorsSubsectionCard[] {
    const cards: ColorsSubsectionCard[] = []
    cards.push(this.#generateColorsSubsectionPrimitiveWhiteCard())
    for (let percent = 1; percent <= 9; percent += 1) {
      const grayCode = `gray-00${percent}`
      cards.push(this.#generateColorsSubsectionPrimitiveGrayCard(grayCode))
    }
    for (let percent = 10; percent <= 90; percent += 10) {
      const grayCode = `gray-0${percent}`
      cards.push(this.#generateColorsSubsectionPrimitiveGrayCard(grayCode))
    }
    for (let percent = 91; percent <= 99; percent += 1) {
      const grayCode = `gray-0${percent}`
      cards.push(this.#generateColorsSubsectionPrimitiveGrayCard(grayCode))
    }
    return cards
  }

  #generateColorsSubsectionPrimitiveWhiteCard(): ColorsSubsectionCard {
    return {
      cssClass: `app-js-colors__primitive-white-card`,
      text: 'white',
    }
  }

  #generateHeadingsSubsection(): HeadingsSubsection {
    return {
      heading2: 'Title text level 2',
      heading3: 'Title text level 3',
      heading4: 'Title text level 4',
      paragraph: 'Paragraph long text.'.repeat(20),
      title: 'Headings',
    }
  }
}

interface ColorsSubsection {
  readonly grayCards: readonly ColorsSubsectionCard[]
  readonly title: string
}

interface ColorsSubsectionCard {
  readonly cssClass: string
  readonly text: string
}

interface HeadingsSubsection {
  readonly heading2: string
  readonly heading3: string
  readonly heading4: string
  readonly paragraph: string
  readonly title: string
}
