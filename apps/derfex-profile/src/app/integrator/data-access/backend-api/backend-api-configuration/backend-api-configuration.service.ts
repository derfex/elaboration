import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, type Observable, shareReplay } from 'rxjs'
import { assertDefined } from '~app/dev/dev-error.util'
import { prepareProfileDataBEAPIURL } from '~be/backend-api-configuration/backend-api-configuration'
import type {
  BackendAPIConfigurationForBE,
  BackendAPIRelativeURLCodenameForBE,
  BackendAPIURLCodename,
} from '~be/backend-api-configuration/backend-api-configuration.type'

@Injectable({
  providedIn: 'root',
})
export class BackendAPIConfigurationService {
  readonly #relativeURLCodenamesMap: ReadonlyMap<BackendAPIRelativeURLCodenameForBE, BackendAPIURLCodename> =
    new Map<BackendAPIRelativeURLCodenameForBE, BackendAPIURLCodename>([
      ['dxActivitiesSectionRelativeURL', 'sections/dxActivities'],
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

  // TODO: Do we need to specify `never` if we have not `throw` inside?
  public readURL(urlCodename: BackendAPIURLCodename): Observable<string> | never {
    return this.#urlMap$.pipe(
      map((urlMap): string | never => {
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
    const backendAPIConfigurationURL = prepareProfileDataBEAPIURL('data/settings/backend-api-configuration.json')
    return httpClient.get<BackendAPIConfigurationForBE>(backendAPIConfigurationURL)
  }
}

type RelativeURLEntry = readonly [BackendAPIRelativeURLCodenameForBE, string]
type RelativeURLEntries = readonly RelativeURLEntry[]
type URLEntry = readonly [BackendAPIURLCodename, string]
type URLEntries = readonly URLEntry[]
