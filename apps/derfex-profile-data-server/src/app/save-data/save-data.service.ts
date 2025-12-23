import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as fs from 'fs-extra'
import * as path from 'path'
import type { SaveFilePostRequestBody, SaveFilePostResponse } from './save-data.type'

const filePathPrefix = path.join(__dirname)
const filesMap = new Map()

@Injectable()
export class SaveDataService {
  public async saveFile(@Body() { content, fileName }: SaveFilePostRequestBody): Promise<SaveFilePostResponse> {
    if (!fileName || !content) {
      throw new HttpException('Specify the file name and its contents.', HttpStatus.BAD_REQUEST)
    }

    let file = filesMap.get(fileName)
    if (!file) {
      throw new HttpException('Use a valid file name.', HttpStatus.BAD_REQUEST)
    }

    file = path.join(filePathPrefix, file)

    try {
      await fs.outputFile(file, content)
      return { message: 'The file was saved successfully.' }
    } catch {
      throw new HttpException('Error saving file.', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
