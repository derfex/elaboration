import type { DXProject, DXProjectCodename } from '~entities/dx-projects/dx-projects.type'

// TODO?: Do we need it?
export const dxProjects = [
  {
    codename: 'PetShop' as DXProjectCodename,
    name: 'Pet shop',
    resultURL: 'https://derfex.github.io/elaboration/apps/pet-shop/browser',
    sourceURL: 'https://github.com/derfex/elaboration/tree/master/apps/pet-shop',
  },
  {
    codename: 'TicTacToe' as DXProjectCodename,
    name: 'Tic-Tac-Toe',
    resultURL: 'https://derfex.github.io/pure-tasks/tic-tac-toe',
    sourceURL: 'https://github.com/derfex/pure-tasks/tree/master/tic-tac-toe',
  },
  {
    codename: 'checkIfTextsAreAnagrams' as DXProjectCodename,
    name: 'Anagrams',
    resultURL: 'https://derfex.github.io/pure-tasks/check-if-texts-are-anagrams',
    sourceURL: 'https://github.com/derfex/pure-tasks/tree/master/check-if-texts-are-anagrams',
  },
  {
    codename: 'OperatorTypeOf' as DXProjectCodename,
    name: '`typeof` operator',
    resultURL: 'https://derfex.github.io/experience/typeof',
    sourceURL: 'https://github.com/derfex/experience/tree/develop/typeof',
  },
  {
    codename: 'BinarySearch' as DXProjectCodename,
    name: 'Binary search',
    resultURL: 'https://derfex.github.io/pure-tasks/binary-search',
    sourceURL: 'https://github.com/derfex/pure-tasks/tree/master/binary-search',
  },
  {
    codename: 'SVGAndTransitions' as DXProjectCodename,
    name: 'SVG & transitions',
    resultURL: 'https://derfex.github.io/pure-tasks/svg-chart',
    sourceURL: 'https://github.com/derfex/pure-tasks/tree/master/svg-chart',
  },
] as const satisfies readonly DXProject[]
