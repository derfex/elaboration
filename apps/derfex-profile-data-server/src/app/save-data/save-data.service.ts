import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as fsExtra from 'fs-extra'
import path from 'node:path'
import type { SaveFilePostRequestBody, SaveFilePostResponse } from './save-data.type'

const filePathPrefix = path.join(__dirname)
const filesMap = new Map()

@Injectable()
export class SaveDataService {
  // Note: use `fileName` in API to simplify the parameter's name and hide the logic.
  public async saveFile(
    @Body() { content, fileName: fileCodename }: SaveFilePostRequestBody,
  ): Promise<SaveFilePostResponse> {
    if (!fileCodename || !content) {
      throw new HttpException('Specify the file name and its contents.', HttpStatus.BAD_REQUEST)
    }

    let fileName = filesMap.get(fileCodename)
    if (!fileName) {
      throw new HttpException('Use a valid file name.', HttpStatus.BAD_REQUEST)
    }

    fileName = path.join(filePathPrefix, fileName)

    try {
      await fsExtra.outputFile(fileName, content)
      return { message: 'The file was saved successfully.' }
    } catch {
      throw new HttpException('Error saving file.', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
