import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-colors-presentation',
  styleUrl: './colors-presentation.component.sass',
  templateUrl: './colors-presentation.component.html',
})
export class ColorsPresentationComponent {
  protected readonly colorsSubsection = this.#generateColorsSubsection()

  #generateColorsSubsection(): ColorsSubsection {
    return {
      grayCards: this.#generateColorsSubsectionPrimitiveGrayCards(),
      title: 'Colors',
    }
  }

  #generateColorsSubsectionPrimitiveBlackCard(): ColorsSubsectionCard {
    return {
      cssClass: `app-js-colors__primitive-black-card`,
      text: 'black',
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
    cards.push(this.#generateColorsSubsectionPrimitiveBlackCard())
    return cards
  }

  #generateColorsSubsectionPrimitiveWhiteCard(): ColorsSubsectionCard {
    return {
      cssClass: `app-js-colors__primitive-white-card`,
      text: 'white',
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
