import {
  CharacterByIdResponse,
  CharacterResponse,
} from '../domain/CharacterTypes'

const URL = 'https://dragonball-api.com/api/characters'

export const fetchCharacters = async (): Promise<CharacterResponse> => {
  try {
    const response = await fetch(`${URL}?limit=50`)

    if (!response.ok) {
      throw new Error(
        `Error en fetchCharacters: ${response.status} - ${response.statusText}`
      )
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error('❌ Error en fetchCharacters:', error)

    return {
      items: [],
      meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 0,
        totalPages: 0,
        currentPage: 0,
      },
      links: {
        first: '',
        previous: null,
        next: null,
        last: '',
      },
    }
  }
}

export const fetchCharacterById = async (
  id: number
): Promise<CharacterByIdResponse> => {
  try {
    console.log(`🔍 Fetching character ID: ${id}...`)
    const response = await fetch(`${URL}/${id}`)

    if (!response.ok) {
      console.error(
        `❌ Error en fetchCharacterById (${id}): ${response.status} - ${response.statusText}`
      )
      return {
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
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error(`❌ Error en fetchCharacterById (${id}):`, error)

    return {
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
  }
}
