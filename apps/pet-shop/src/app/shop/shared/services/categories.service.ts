// External modules.
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Internal modules.
import { APIService } from '../../../shared/services/api.service';
import { environment } from './environment.prod';

// Definitions.
// TODO: Avoid `I` prefix.
interface ICategory {
  id: number;
  name: string;
}

export type CategoryModels = readonly ICategory[];


@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  readonly #backendAPIService = inject(APIService);

  public getAll(): Observable<CategoryModels> {
    return this.#backendAPIService
      .get<readonly ICategory[]>(environment.API.categories.getAll);
  }
}
