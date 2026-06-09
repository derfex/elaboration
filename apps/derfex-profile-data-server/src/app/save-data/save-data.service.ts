import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as fsExtra from 'fs-extra'
import path from 'node:path'
import type { SaveFilePostRequestBody, SaveFilePostResponse } from './save-data.type'

const filesMap = new Map()
const pathPrefixes = [] as const

@Injectable()
export class SaveDataService {
  // Note: use `fileName` in API to simplify the parameter's name and hide the logic.
  public async saveFile(
    @Body() { content, fileName: fileCodename }: SaveFilePostRequestBody,
  ): Promise<SaveFilePostResponse> {
    if (!fileCodename || !content) {
      throw new HttpException('Specify the file name and its contents.', HttpStatus.BAD_REQUEST)
    }

    const fileName = filesMap.get(fileCodename)
    if (!fileName) {
      throw new HttpException('Use a valid file name.', HttpStatus.BAD_REQUEST)
    }

    const promises: Promise<void>[] = []
    pathPrefixes.forEach((prefix: string): void => {
      const filePath = path.join(prefix, fileName)
      const promise = fsExtra.outputFile(filePath, content).catch((): never => {
        throw new HttpException('Error saving file.', HttpStatus.INTERNAL_SERVER_ERROR)
      })
      promises.push(promise)
    })

    try {
      await Promise.all(promises)
      return { message: 'The content was saved successfully.' }
    } catch {
      throw new HttpException('Error saving file.', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
