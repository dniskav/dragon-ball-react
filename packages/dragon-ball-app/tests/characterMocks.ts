import {
  CharacterByIdResponse,
  CharacterListItem,
} from '../src/modules/Character/domain/CharacterTypes'

export const baseCharacter: CharacterListItem = {
  id: 0,
  name: '',
  ki: '0',
  maxKi: '0',
  race: '',
  gender: '',
  description: '',
  image: '',
  affiliation: '',
  deletedAt: null,
}

export const mockCharacterById: CharacterByIdResponse = {
  id: 0,
  name: '',
  ki: '',
  maxKi: '',
  race: '',
  gender: '',
  description: '',
  image: '',
  affiliation: '',
  deletedAt: null,
  originPlanet: {
    id: 0,
    name: '',
    isDestroyed: false,
    description: '',
    image: '',
    deletedAt: null,
  },
  transformations: [
    {
      id: 0,
      name: '',
      image: '',
      ki: '',
      deletedAt: null,
    },
  ],
}
