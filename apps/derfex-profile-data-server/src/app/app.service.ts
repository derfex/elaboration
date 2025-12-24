import { Injectable } from '@nestjs/common'
import type { AppServiceData } from './app.service.type'

@Injectable()
export class AppService {
  public getData(): AppServiceData {
    return { message: 'Hello API' }
  }
}
