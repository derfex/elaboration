import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, type Observable, shareReplay, switchMap, tap } from 'rxjs'
import { assertDefined } from '~app/dev/dev-error.util'
import { prepareProfileDataBEAPIURL } from '~be/backend-api-configuration/backend-api-configuration'
import type {
  BackendAPIConfigurationForBE,
  BackendAPIRelativeURLCodenameForBE,
  BackendAPIURLCodename,
} from '~be/backend-api-configuration/backend-api-configuration.type'
import { LoadingNotifierService } from '~integrator/data-access/loading-notifier/loading-notifier.service'
import { LocaleSwitcherService } from '~integrator/data-access/locale/locale-switcher.service'
import type { AppLocale } from '~integrator/data-access/locale/locale.type'

@Injectable({
  providedIn: 'root',
})
export class BackendAPIConfigurationService {
  readonly #loadingNotifierService = inject(LoadingNotifierService)
  readonly #localeSwitcherService = inject(LocaleSwitcherService)

  readonly #configurationURLMap: ReadonlyMap<AppLocale, string> = new Map<AppLocale, string>([
    ['EN', prepareProfileDataBEAPIURL('data/settings/backend-api-configuration.json')],
    ['RU', prepareProfileDataBEAPIURL('data/settings/backend-api-configuration--ru.json')],
  ])

  readonly #relativeURLCodenamesMap: ReadonlyMap<BackendAPIRelativeURLCodenameForBE, BackendAPIURLCodename> = new Map<
    BackendAPIRelativeURLCodenameForBE,
    BackendAPIURLCodename
  >([
    ['dxActivitiesSectionCompiledRelativeURL', 'compiled/dxActivities/section'],
    ['dxActivitiesSectionRelativeURL', 'sections/dxActivities'],
    ['dxProjectsSectionRelativeURL', 'sections/dxProjects'],
    ['dxSkillsSectionRelativeURL', 'sections/dxSkills'],
    ['heroSectionRelativeURL', 'sections/hero'],
  ])

  readonly #urlMap$: Observable<ReadonlyMap<BackendAPIURLCodename, string>> = this.#readConfiguration(
    inject(HttpClient),
  ).pipe(
    tap((): void => {
      this.#loadingNotifierService.setProcessLoading(createProcessCodename('#urlMap$'), true)
    }),
    map((configuration: BackendAPIConfigurationForBE): ReadonlyMap<BackendAPIURLCodename, string> => {
      const urlMapEntries = this.#generateURLMapEntries(configuration)
      return new Map<BackendAPIURLCodename, string>(urlMapEntries)
    }),
    shareReplay(1),
    tap((): void => {
      this.#loadingNotifierService.setProcessLoading(createProcessCodename('#urlMap$'), false)
    }),
  )

  public readURL(urlCodename: BackendAPIURLCodename): Observable<string> {
    const processCodename = createProcessCodename(urlCodename)
    return this.#urlMap$.pipe(
      tap((): void => {
        this.#loadingNotifierService.setProcessLoading(processCodename, true)
      }),
      map((urlMap): string => {
        const url = urlMap.get(urlCodename)
        assertDefined<string>(
          url,
          `[BackendAPIConfigurationService] Wrong data. The URL codename ('${urlCodename}') does not exist.`,
        )
        return url
      }),
      tap((): void => {
        this.#loadingNotifierService.setProcessLoading(processCodename, false)
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
    const processCodename = createProcessCodename('#readConfiguration')
    return this.#localeSwitcherService.locale.pipe(
      tap((): void => {
        this.#loadingNotifierService.setProcessLoading(processCodename, true)
      }),
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
      tap((): void => {
        this.#loadingNotifierService.setProcessLoading(processCodename, false)
      }),
    )
  }
}

type RelativeURLEntry = readonly [BackendAPIRelativeURLCodenameForBE, string]
type RelativeURLEntries = readonly RelativeURLEntry[]
type URLEntry = readonly [BackendAPIURLCodename, string]
type URLEntries = readonly URLEntry[]

function createProcessCodename(string: string): string {
  return `BackendAPIConfigurationService ${string}`
}
