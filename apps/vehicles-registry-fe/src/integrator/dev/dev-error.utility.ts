import { devPrefix } from './dev.utility'

export function assertDefined<Type>(value: Type | undefined, message: string): asserts value is Type {
  if (value !== undefined) return
  throw newDevError(message)
}

const devErrorPrefix = `${devPrefix}
`
const defaultMessage = 'Unspecified error.'

export function newDevError(message: string): Error {
  return new Error(devErrorPrefix + (message || defaultMessage))
}
