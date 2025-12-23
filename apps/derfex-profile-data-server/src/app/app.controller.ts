import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import type { AppServiceData } from './app.service.type'
import { SaveDataService } from './save-data/save-data.service'
import type { SaveFilePostRequestBody, SaveFilePostResponse } from './save-data/save-data.type'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly saveDataService: SaveDataService,
  ) {}

  @Get()
  public getData(): AppServiceData {
    return this.appService.getData()
  }

  @Post('save-file')
  public async saveFile(@Body() body: SaveFilePostRequestBody): Promise<SaveFilePostResponse> {
    return this.saveDataService.saveFile(body)
  }
}
