export interface SaveFilePostRequestBody {
  readonly content: string
  readonly fileName: string
}

export interface SaveFilePostResponse {
  readonly message: string
}
