import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { CharacterList } from './CharacterList'
import { AppContext } from '../../../context/AppContext'
import { CharacterService } from '../../../modules/Character/application/CharacterService'
import { CharacterListItem } from '../../../modules/Character/domain/CharacterTypes'
import { TextEncoder, TextDecoder } from 'util'
import { baseCharacter } from '../../../../tests/characterMocks'
import { mockState } from '../../../../tests/stateMock'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

jest.mock('../../../modules/Character/application/CharacterService', () => ({
  CharacterService: {
    getAll: jest.fn(),
  },
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('CharacterList', () => {
  const mockDispatch = jest.fn()
  const mockNavigate = jest.fn()

  beforeEach(() => {
    ;(CharacterService.getAll as jest.Mock).mockResolvedValue([
      {
        id: 1,
        name: 'Goku',
        image: 'goku.jpg',
      },
      {
        id: 2,
        name: 'Vegeta',
        image: 'vegeta.jpg',
      },
    ] as CharacterListItem[])

    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate)
  })

  it('debería renderizar el progreso correctamente', () => {
    render(
      <AppContext.Provider
        value={{
          state: { currentList: [], favoriteCharacters: [] },
          dispatch: mockDispatch,
        }}
      >
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </AppContext.Provider>
    )

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('debería cargar personajes al montar y despachar acciones', async () => {
    render(
      <AppContext.Provider
        value={{
          state: { currentList: [], favoriteCharacters: [] },
          dispatch: mockDispatch,
        }}
      >
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </AppContext.Provider>
    )

    await waitFor(() => expect(CharacterService.getAll).toHaveBeenCalled())
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_CHARACTERS',
      payload: expect.any(Array),
    })
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_CURRENT_LIST' })
  })

  it('debería filtrar personajes correctamente', async () => {
    render(
      <AppContext.Provider
        value={{
          state: {
            currentList: [
              { ...baseCharacter, id: 1, name: 'Goku', image: 'goku.jpg' },
              { ...baseCharacter, id: 2, name: 'Vegeta', image: 'vegeta.jpg' },
            ],
            favoriteCharacters: [],
          },
          dispatch: mockDispatch,
        }}
      >
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </AppContext.Provider>
    )

    const searchBox = screen.getByPlaceholderText(/buscar|search/i)
    fireEvent.change(searchBox, { target: { value: 'Goku' } })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'SET_FILTER_TERM',
          payload: 'Goku',
        })
      )
    })

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_CURRENT_LIST' })
  })

  it('debería navegar al hacer click en un personaje', () => {
    render(
      <AppContext.Provider
        value={{
          state: { ...mockState },
          dispatch: mockDispatch,
        }}
      >
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </AppContext.Provider>
    )

    fireEvent.click(screen.getByText('Goku'))
    expect(mockNavigate).toHaveBeenCalledWith('/character/1')
  })
})
