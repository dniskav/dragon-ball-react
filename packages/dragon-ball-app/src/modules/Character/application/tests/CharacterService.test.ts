import { CharacterDetail, CharacterListItem } from '../../domain/CharacterTypes'
import { CharacterRepository } from '../../infrastructure/CharacterRepository'
import { CharacterService } from '../CharacterService'

jest.mock('../../infrastructure/CharacterRepository', () => ({
  CharacterRepository: {
    getAll: jest.fn(),
    getById: jest.fn(),
  },
}))

describe('CharacterService', () => {
  const mockCharacterListItem: CharacterListItem = {
    id: 1,
    name: 'Goku',
    ki: '60.000.000',
    maxKi: '90 Septillion',
    race: 'Saiyan',
    gender: 'Male',
    description: 'El protagonista de Dragon Ball.',
    image: 'https://dragonball-api.com/characters/goku_normal.webp',
    affiliation: 'Z Fighter',
    deletedAt: null,
  }

  const mockCharacterDetail: CharacterDetail = {
    ...mockCharacterListItem,
    originPlanet: {
      id: 1,
      name: 'Planet Vegeta',
      isDestroyed: true,
      description: 'Planeta natal de los Saiyan.',
      image: 'https://example.com/planet_vegeta.webp',
      deletedAt: null,
    },
    transformations: [
      {
        id: 1,
        name: 'Super Saiyan',
        image: 'https://example.com/ssj.webp',
        ki: '150.000.000',
        deletedAt: null,
      },
    ],
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should fetch all characters', async () => {
    ;(CharacterRepository.getAll as jest.Mock).mockResolvedValue({
      items: [mockCharacterListItem],
    })

    const characters = await CharacterService.getAll()

    expect(CharacterRepository.getAll).toHaveBeenCalledTimes(1)
    expect(characters).toEqual([mockCharacterListItem])
  })

  test('should fetch a character by ID', async () => {
    ;(CharacterRepository.getById as jest.Mock).mockResolvedValue(
      mockCharacterDetail
    )

    const character = await CharacterService.getById(1)

    expect(CharacterRepository.getById).toHaveBeenCalledWith(1)
    expect(character).toEqual(mockCharacterDetail)
  })

  test('should throw an error when getAll fails', async () => {
    ;(CharacterRepository.getAll as jest.Mock).mockRejectedValue(
      new Error('API Error')
    )

    await expect(CharacterService.getAll()).rejects.toThrow('API Error')
  })

  test('should throw an error when getById fails', async () => {
    ;(CharacterRepository.getById as jest.Mock).mockRejectedValue(
      new Error('Character Not Found')
    )

    await expect(CharacterService.getById(999)).rejects.toThrow(
      'Character Not Found'
    )
  })
})
