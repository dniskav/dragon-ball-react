import { CharacterListItem } from '../modules/Character/domain/CharacterTypes'

export interface AppState {
  characters: CharacterListItem[]
  favoriteCharacters: CharacterListItem[]
  filterTerm: string
  currentList: CharacterListItem[]
  searchQuery: string
  favoritesOnly: boolean
}

export type AppAction =
  | { type: 'SET_CHARACTERS'; payload: CharacterListItem[] }
  | { type: 'ADD_FAVORITE'; payload: CharacterListItem }
  | { type: 'SET_CURRENT_LIST' }
  | { type: 'SET_FILTER_TERM'; payload: string }
  | { type: 'SHOW_FAVORITES_ONLY'; payload: boolean }
  | { type: 'REMOVE_FAVORITE'; payload: number }

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SHOW_FAVORITES_ONLY':
      return { ...state, favoritesOnly: action.payload }

    case 'SET_CHARACTERS':
      return { ...state, characters: action.payload }

    case 'SET_FILTER_TERM':
      return { ...state, filterTerm: action.payload }

    case 'SET_CURRENT_LIST': {
      const list = state.favoritesOnly
        ? state.favoriteCharacters
        : state.characters
      const currentList = list.filter((char: CharacterListItem) => {
        return state.filterTerm !== ''
          ? char.name.toLowerCase().includes(state.filterTerm.toLowerCase())
          : true
      })
      return { ...state, currentList }
    }

    case 'ADD_FAVORITE':
      return {
        ...state,
        favoriteCharacters: removeDuplicates([
          ...state.favoriteCharacters,
          action.payload,
        ]),
      }

    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favoriteCharacters: state.favoriteCharacters.filter(
          (char) => char.id !== action.payload
        ),
      }

    default:
      return state
  }
}

const removeDuplicates = (
  characters: CharacterListItem[]
): CharacterListItem[] => {
  const CharactersSet = new Set(characters.map((C) => JSON.stringify(C)))
  return Array.from(CharactersSet).map((C) => JSON.parse(C))
}
