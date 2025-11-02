import { type DXContact, DXContactCodename } from '~entities/dx-contacts/dx-contacts.type'

// TODO?: Do we need it?
export const dxContacts = [
  {
    codename: DXContactCodename.GitHub,
    name: 'GitHub',
    url: 'https://github.com/derfex',
  },
  {
    codename: DXContactCodename.LinkedIn,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/dmitry-p-b43379302',
  },
  {
    codename: DXContactCodename.Telegram,
    name: 'Telegram',
    url: 'https://t.me/dapolovnyov',
  },
] as const satisfies readonly DXContact[]
