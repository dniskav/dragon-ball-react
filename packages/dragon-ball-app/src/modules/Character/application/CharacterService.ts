import { CharacterRepository } from '../infrastructure/CharacterRepository'
import { CharacterListItem, CharacterDetail } from '../domain/CharacterTypes'

export const CharacterService = {
  getAll: async (): Promise<CharacterListItem[]> => {
    try {
      const response = await CharacterRepository.getAll()
      return response.items.map((item) => mapToCharacterListItem(item))
    } catch (error) {
      console.error('Error fetching characters:', error)
      throw error
    }
  },

  getById: async (id: number): Promise<CharacterDetail> => {
    try {
      const response = await CharacterRepository.getById(id)
      return mapToCharacterDetail(response)
    } catch (error) {
      console.error(`Error fetching character with ID ${id}:`, error)
      throw error
    }
  },
}

const mapToCharacterListItem = (data: any): CharacterListItem => ({
  id: data.id,
  name: data.name,
  ki: data.ki,
  maxKi: data.maxKi,
  race: data.race,
  gender: data.gender,
  description: data.description,
  image: data.image,
  affiliation: data.affiliation,
  deletedAt: data.deletedAt || null,
})

const mapToCharacterDetail = (data: any): CharacterDetail => ({
  ...mapToCharacterListItem(data),
  originPlanet: {
    id: data.originPlanet.id,
    name: data.originPlanet.name,
    isDestroyed: data.originPlanet.isDestroyed,
    description: data.originPlanet.description,
    image: data.originPlanet.image,
    deletedAt: data.originPlanet.deletedAt || null,
  },
  transformations: data.transformations.map((t: any) => ({
    id: t.id,
    name: t.name,
    image: t.image,
    ki: t.ki,
    deletedAt: t.deletedAt || null,
  })),
})
