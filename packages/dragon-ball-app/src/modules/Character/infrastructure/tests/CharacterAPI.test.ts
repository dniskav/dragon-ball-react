import {
  baseCharacter,
  mockCharacterById,
} from '../../../../../tests/characterMocks'
import {
  CharacterResponse,
  CharacterByIdResponse,
} from '../../domain/CharacterTypes'
import { fetchCharacterById, fetchCharacters } from '../CharacterAPI'
import { apiMock } from '../../../../../tests/apiMocks'

global.fetch = jest.fn()

describe('CharacterAPI', () => {
  describe('fetchCharacters', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('debería obtener la lista de personajes', async () => {
      const mockData: CharacterResponse = {
        items: [
          {
            ...baseCharacter,
            id: 1,
            name: 'Goku',
            image: 'https://dragonball-api.com/goku.jpg',
          },
          {
            ...baseCharacter,
            id: 2,
            name: 'Vegeta',
            image: 'https://dragonball-api.com/vegeta.jpg',
          },
        ],
        meta: {
          totalItems: 2,
          itemCount: 2,
          itemsPerPage: 50,
          totalPages: 1,
          currentPage: 1,
        },
        links: {
          first: 'https://dragonball-api.com/api/characters?page=1',
          previous: null,
          next: null,
          last: 'https://dragonball-api.com/api/characters?page=1',
        },
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      })

      const result = await fetchCharacters()
      expect(result).toEqual(mockData)
      expect(fetch).toHaveBeenCalledWith(
        'https://dragonball-api.com/api/characters?limit=50'
      )
    })

    it('debería manejar un error si la API falla', async () => {
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: jest.fn().mockResolvedValue({}),
      })

      const result = await fetchCharacters()
      expect(result).toEqual({
        items: [],
        meta: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: 0,
          totalPages: 0,
          currentPage: 0,
        },
        links: { first: '', previous: null, next: null, last: '' },
      })
    })
  })

  describe('fetchCharacterById', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('debería obtener un personaje por ID', async () => {
      const mockCharacter: CharacterByIdResponse = {
        ...mockCharacterById,
        id: 1,
        name: 'Goku',
        image: 'https://dragonball-api.com/goku.jpg',
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockCharacter),
      })

      const result = await fetchCharacterById(1)
      expect(result).toEqual(mockCharacter)
      expect(fetch).toHaveBeenCalledWith(
        'https://dragonball-api.com/api/characters/1'
      )
    })

    it('debería manejar un error si la API falla al buscar por ID', async () => {
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: jest.fn().mockResolvedValue({}),
      })

      const result = await fetchCharacterById(1)

      expect(result).toEqual({
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
      })
    })
  })
})
