import { baseCharacter } from './characterMocks'

export const mockState = {
  characters: [
    {
      ...baseCharacter,
      id: 1,
      name: 'Goku',
      ki: '9000',
      maxKi: '10000',
      race: 'Saiyan',
      gender: 'Male',
      description: 'El legendario super saiyan',
      image: 'https://dragonball-api.com/characters/goku_normal.webp',
      affiliation: 'Z Fighters',
      deletedAt: null,
    },
    {
      ...baseCharacter,
      id: 2,
      name: 'Vegeta',
      image: 'https://dragonball-api.com/characters/vegeta_normal.webp',
    },
  ],
  favoriteCharacters: [
    {
      ...baseCharacter,
      id: 1,
      name: 'Goku',
      image: 'https://dragonball-api.com/characters/goku_normal.webp',
    },
  ],
  currentList: [],
  filterTerm: '',
  favoritesOnly: false,
}
