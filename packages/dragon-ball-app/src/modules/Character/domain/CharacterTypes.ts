export interface CharacterBase {
  id: number
  name: string
  ki: string
  maxKi: string
  race: string
  gender: string
  description: string
  image: string
  affiliation: string
  deletedAt: string | null
}

export interface CharacterListItem extends CharacterBase {}

export interface OriginPlanet {
  id: number
  name: string
  isDestroyed: boolean
  description: string
  image: string
  deletedAt: string | null
}

export interface Transformation {
  id: number
  name: string
  image: string
  ki: string
  deletedAt: string | null
}

export interface CharacterDetail extends CharacterBase {
  originPlanet: OriginPlanet
  transformations: Transformation[]
}

export interface CharacterResponse {
  items: CharacterListItem[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
  links: {
    first: string
    previous: string | null
    next: string | null
    last: string
  }
}

export interface CharacterByIdResponse {
  id: number
  name: string
  ki: string
  maxKi: string
  race: string
  gender: string
  description: string
  image: string
  affiliation: string
  deletedAt: string | null
  originPlanet: {
    id: number
    name: string
    isDestroyed: boolean
    description: string
    image: string
    deletedAt: string | null
  }
  transformations: Transformation[]
}

export interface Transformation {
  id: number
  name: string
  image: string
  ki: string
  deletedAt: string | null
}
