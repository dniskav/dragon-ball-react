import { CharacterListItem } from '../../modules/Character/domain/CharacterTypes'
import { baseCharacter } from '../../../tests/characterMocks'
import {
  appReducer,
  AppState,
  AppAction,
  removeDuplicates,
} from '../AppReducer'

describe('appReducer', () => {
  let initialState: AppState

  beforeEach(() => {
    initialState = {
      characters: [],
      favoriteCharacters: [],
      filterTerm: '',
      currentList: [],
      favoritesOnly: false,
    }
  })

  it('should set characters', () => {
    const newCharacters: CharacterListItem[] = [
      {
        ...baseCharacter,
        id: 1,
        name: 'Goku',
        race: 'Saiyan',
        ki: '60.000.000',
      },
      {
        ...baseCharacter,
        id: 2,
        name: 'Vegeta',
        race: 'Saiyan',
        ki: '54.000.000',
      },
    ]

    const action: AppAction = { type: 'SET_CHARACTERS', payload: newCharacters }
    const newState = appReducer(initialState, action)

    expect(newState.characters).toEqual(newCharacters)
  })

  it('should add favorite character and avoid duplicates', () => {
    const favoriteCharacter = { ...baseCharacter, id: 1, name: 'Goku' }

    const action1: AppAction = {
      type: 'ADD_FAVORITE',
      payload: favoriteCharacter,
    }
    const stateAfterFirstAdd = appReducer(initialState, action1)

    expect(stateAfterFirstAdd.favoriteCharacters).toContainEqual(
      favoriteCharacter
    )

    // Trying to add the same character again
    const stateAfterDuplicateAdd = appReducer(stateAfterFirstAdd, action1)
    expect(stateAfterDuplicateAdd.favoriteCharacters.length).toBe(1) // No debe duplicarse
  })

  it('should remove favorite character', () => {
    initialState.favoriteCharacters = [
      { ...baseCharacter, id: 1, name: 'Goku' },
      { ...baseCharacter, id: 2, name: 'Vegeta' },
    ]

    const action: AppAction = { type: 'REMOVE_FAVORITE', payload: 1 }
    const newState = appReducer(initialState, action)

    expect(newState.favoriteCharacters).not.toContainEqual({
      ...baseCharacter,
      id: 1,
      name: 'Goku',
    })
    expect(newState.favoriteCharacters.length).toBe(1) // Solo queda Vegeta
  })

  it('should set filter term', () => {
    const action: AppAction = { type: 'SET_FILTER_TERM', payload: 'Saiyan' }
    const newState = appReducer(initialState, action)

    expect(newState.filterTerm).toBe('Saiyan')
  })

  it('should show favorites only', () => {
    const action: AppAction = { type: 'SHOW_FAVORITES_ONLY', payload: true }
    const newState = appReducer(initialState, action)

    expect(newState.favoritesOnly).toBe(true)
  })

  it('should set current list based on filter', () => {
    initialState.characters = [
      { ...baseCharacter, id: 1, name: 'Goku' },
      { ...baseCharacter, id: 2, name: 'Vegeta' },
    ]
    initialState.filterTerm = 'Goku'

    const action: AppAction = { type: 'SET_CURRENT_LIST' }
    const newState = appReducer(initialState, action)

    expect(newState.currentList).toEqual([
      { ...baseCharacter, id: 1, name: 'Goku' },
    ])
  })

  it('should return the same state if action type is unknown', () => {
    const action = { type: 'UNKNOWN_ACTION' } as AppAction
    const newState = appReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})

describe('removeDuplicates', () => {
  it('should remove duplicate characters', () => {
    const characters: CharacterListItem[] = [
      { ...baseCharacter, id: 1, name: 'Goku' },
      { ...baseCharacter, id: 1, name: 'Goku' }, // Duplicado
      { ...baseCharacter, id: 2, name: 'Vegeta' },
    ]

    const result = removeDuplicates(characters)

    expect(result).toEqual([
      { ...baseCharacter, id: 1, name: 'Goku' },
      { ...baseCharacter, id: 2, name: 'Vegeta' },
    ])
  })
})
