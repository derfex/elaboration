import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, type Observable, shareReplay, switchMap } from 'rxjs'
import { assertDefined } from '~app/dev/dev-error.util'
import { prepareProfileDataBEAPIURL } from '~be/backend-api-configuration/backend-api-configuration'
import type {
  BackendAPIConfigurationForBE,
  BackendAPIRelativeURLCodenameForBE,
  BackendAPIURLCodename,
} from '~be/backend-api-configuration/backend-api-configuration.type'
import { LocaleSwitcherService } from '~integrator/data-access/locale/locale-switcher.service'
import type { AppLocale } from '~integrator/data-access/locale/locale.type'

@Injectable({
  providedIn: 'root',
})
export class BackendAPIConfigurationService {
  readonly #localeSwitcherService = inject(LocaleSwitcherService)

  readonly #configurationURLMap: ReadonlyMap<AppLocale, string> = new Map<AppLocale, string>([
    ['EN', prepareProfileDataBEAPIURL('data/settings/backend-api-configuration.json')],
    ['RU', prepareProfileDataBEAPIURL('data/settings/backend-api-configuration--ru.json')],
  ])

  readonly #relativeURLCodenamesMap: ReadonlyMap<BackendAPIRelativeURLCodenameForBE, BackendAPIURLCodename> =
    new Map<BackendAPIRelativeURLCodenameForBE, BackendAPIURLCodename>([
      ['dxActivitiesSectionCompiledRelativeURL', 'compiled/dxActivities/section'],
      ['dxActivitiesSectionRelativeURL', 'sections/dxActivities'],
      ['dxSkillsSectionRelativeURL', 'sections/dxSkills'],
      ['heroSectionRelativeURL', 'sections/hero'],
    ])

  readonly #urlMap$: Observable<ReadonlyMap<BackendAPIURLCodename, string>> = this.#readConfiguration(
    inject(HttpClient),
  ).pipe(
    map((configuration: BackendAPIConfigurationForBE): ReadonlyMap<BackendAPIURLCodename, string> => {
      const urlMapEntries = this.#generateURLMapEntries(configuration)
      return new Map<BackendAPIURLCodename, string>(urlMapEntries)
    }),
    shareReplay(1),
  )

  public readURL(urlCodename: BackendAPIURLCodename): Observable<string> {
    return this.#urlMap$.pipe(
      map((urlMap): string => {
        const url = urlMap.get(urlCodename)
        assertDefined<string>(
          url,
          `[BackendAPIConfigurationService] Wrong data. The URL codename ('${urlCodename}') does not exist.`,
        )
        return url
      }),
    )
  }

  #generateURLMapEntries(codenamesAndPostfixesRecord: BackendAPIConfigurationForBE): URLEntries {
    const relativeURLEntries: RelativeURLEntries = Object.entries(codenamesAndPostfixesRecord) as RelativeURLEntries
    return relativeURLEntries.map(([relativeURLCodename, postfix]: RelativeURLEntry): URLEntry => {
      const urlCodename = this.#relativeURLCodenamesMap.get(relativeURLCodename)
      assertDefined<BackendAPIURLCodename>(
        urlCodename,
        `[BackendAPIConfigurationService] Wrong data. The relative URL codename ('${relativeURLCodename}') does not exist.`,
      )
      return [urlCodename, prepareProfileDataBEAPIURL(postfix)]
    })
  }

  #readConfiguration(httpClient: HttpClient): Observable<BackendAPIConfigurationForBE> {
    return this.#localeSwitcherService.locale.pipe(
      map((locale: AppLocale): string => {
        const backendAPIConfigurationURL = this.#configurationURLMap.get(locale)
        assertDefined<string>(
          backendAPIConfigurationURL,
          `[BackendAPIConfigurationService] Wrong data. The locale ('${locale}') does not exist.`,
        )
        return backendAPIConfigurationURL
      }),
      switchMap((backendAPIConfigurationURL: string) => {
        return httpClient.get<BackendAPIConfigurationForBE>(backendAPIConfigurationURL)
      }),
    )
  }
}

type RelativeURLEntry = readonly [BackendAPIRelativeURLCodenameForBE, string]
type RelativeURLEntries = readonly RelativeURLEntry[]
type URLEntry = readonly [BackendAPIURLCodename, string]
type URLEntries = readonly URLEntry[]
