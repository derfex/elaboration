export function prepareProfileDataBEAPIURL(postfix: string): string {
  return profileDataServerURLPrefix + postfix
}

export function prepareProfileDataCDNURL(postfix: string): string {
  return profileDataServerURLPrefix + postfix
}

const profileDataServerURLPrefix = 'https://derfex.github.io/profile/archives/2025-10-23/data/'
