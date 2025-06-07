// # External modules
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

// # Internal modules
import { environment } from '../../../../environments/environment'
import { APIService } from '../../../shared/services/api.service'

// # Definitions
// TODO: Avoid `I` prefix.
interface ICategory {
  id: number
  name: string
}

export type CategoryModels = readonly ICategory[]

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  readonly #backendAPIService = inject(APIService)

  public getAll(): Observable<CategoryModels> {
    return this.#backendAPIService.get<readonly ICategory[]>(environment.API.categories.getAll)
  }
}
