import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SaveDataService } from './save-data/save-data.service'

describe('AppController', (): void => {
  let app: TestingModule

  beforeAll(async (): Promise<void> => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, SaveDataService],
    }).compile()
  })

  describe('getData', (): void => {
    it('should return "Hello API"', (): void => {
      const appController = app.get<AppController>(AppController)
      expect(appController.getData()).toEqual({ message: 'Hello API' })
    })
  })
})
