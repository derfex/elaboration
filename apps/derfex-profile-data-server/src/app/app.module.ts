import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SaveDataService } from './save-data/save-data.service'

@Module({
  controllers: [AppController],
  imports: [],
  providers: [AppService, SaveDataService],
})
export class AppModule {}
