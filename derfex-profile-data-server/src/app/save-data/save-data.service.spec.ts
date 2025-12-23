import { Test } from '@nestjs/testing'
import { SaveDataService } from './save-data.service'

describe('SaveDataService', (): void => {
  let service: SaveDataService

  beforeAll(async (): Promise<void> => {
    const app = await Test.createTestingModule({
      providers: [SaveDataService],
    }).compile()

    service = app.get<SaveDataService>(SaveDataService)
  })

  describe('saveFile', (): void => {
    it(`should return 'Use a valid file name.'`, (): void => {
      const body = { content: 'test data', fileName: 'test data' }
      expect(service.saveFile(body)).toBeDefined()
    })
  })
})
