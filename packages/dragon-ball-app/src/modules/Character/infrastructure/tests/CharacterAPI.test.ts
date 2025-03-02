import { baseCharacter } from '../../../../../tests/characterMocks'
import { CharacterResponse } from '../../domain/CharacterTypes'
import { fetchCharacterById, fetchCharacters } from '../CharacterAPI'

global.fetch = jest.fn()

describe('CharacterAPI', () => {
  describe('fetchCharacters', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('debería obtener la lista de personajes', async () => {
      const mockData: CharacterResponse = {
        characters: [
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
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      })

      const result = await fetchCharacters()
      expect(result).toEqual(mockData)
      expect(fetch).toHaveBeenCalledWith(
        'https://dragonball-api.com/api/characters?limit=50'
      )
    })

    it('debería manejar un error si la API falla', async () => {
      ;(fetch as jest.Mock).mockRejectedValue(new Error('API Error'))

      await expect(fetchCharacters()).rejects.toThrow('API Error')
    })
  })

  describe('fetchCharacterById', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('debería obtener un personaje por ID', async () => {
      const mockCharacter = {
        id: 1,
        name: 'Goku',
        image: 'https://dragonball-api.com/goku.jpg',
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockCharacter),
      })

      const result = await fetchCharacterById(1)
      expect(result).toEqual(mockCharacter)
      expect(fetch).toHaveBeenCalledWith(
        'https://dragonball-api.com/api/characters/1'
      )
    })

    it('debería manejar un error si la API falla al buscar por ID', async () => {
      ;(fetch as jest.Mock).mockRejectedValue(new Error('API Error'))

      await expect(fetchCharacterById(1)).rejects.toThrow('API Error')
    })
  })
})
