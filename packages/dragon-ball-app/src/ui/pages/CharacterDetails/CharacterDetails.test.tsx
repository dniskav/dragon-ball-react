import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, useParams } from 'react-router-dom'
import CharacterDetails from './CharacterDetails'
import { AppContext } from '../../../context/AppContext'
import { CharacterService } from '../../../modules/Character/application/CharacterService'
import { mockState } from '../../../../tests/stateMock'
import { baseCharacter } from '../../../../tests/characterMocks'

// Mock de `CharacterService`
jest.mock('../../../modules/Character/application/CharacterService', () => ({
  CharacterService: {
    getById: jest.fn(),
  },
}))

// Mock de `useParams`
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
}))

describe('<CharacterDetails />', () => {
  const mockDispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useParams as jest.Mock).mockReturnValue({ id: '1' })

    // Simulamos la API devolviendo el personaje Goku
    ;(CharacterService.getById as jest.Mock).mockResolvedValue({
      ...baseCharacter,
      id: 1,
      name: 'Goku',
      description: 'El legendario super saiyan',
      image: 'https://dragonball-api.com/characters/goku_normal.webp',
      transformations: [
        {
          id: 101,
          name: 'Super Saiyan',
          image: 'https://dragonball-api.com/characters/goku_ssj.webp',
        },
      ],
    })
  })

  it('debería renderizar correctamente', async () => {
    render(
      <AppContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <MemoryRouter>
          <CharacterDetails />
        </MemoryRouter>
      </AppContext.Provider>
    )

    await waitFor(() => expect(CharacterService.getById).toHaveBeenCalled())
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /goku/i })).toBeInTheDocument()
    )

    expect(screen.getByRole('heading', { name: /goku/i })).toBeInTheDocument()
    expect(screen.getByText(/el legendario super saiyan/i)).toBeInTheDocument()
    expect(screen.getByAltText('character.image')).toBeInTheDocument()
  })

  it('debería agregar un personaje a favoritos al hacer clic en el corazón', async () => {
    render(
      <AppContext.Provider
        value={{
          state: { ...mockState, favoriteCharacters: [] },
          dispatch: mockDispatch,
        }}
      >
        <MemoryRouter>
          <CharacterDetails />
        </MemoryRouter>
      </AppContext.Provider>
    )

    await waitFor(() => {
      expect(screen.getByAltText('heart')).toBeInTheDocument()
    })

    await waitFor(() => expect(CharacterService.getById).toHaveBeenCalled())

    const favButton = screen.getByAltText('heart')
    fireEvent.click(favButton)

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_FAVORITE',
      payload: expect.objectContaining({ id: 1, name: 'Goku' }),
    })
  })

  it('debería eliminar un personaje de favoritos si ya está en la lista', async () => {
    const stateWithFavorite = {
      ...mockState,
      favoriteCharacters: [{ ...baseCharacter, id: 1, name: 'Goku' }],
    }

    render(
      <AppContext.Provider
        value={{ state: stateWithFavorite, dispatch: mockDispatch }}
      >
        <MemoryRouter>
          <CharacterDetails />
        </MemoryRouter>
      </AppContext.Provider>
    )

    await waitFor(() => expect(CharacterService.getById).toHaveBeenCalled())

    const favButton = screen.getByAltText('heart')
    fireEvent.click(favButton)

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_FAVORITE',
      payload: 1,
    })
  })

  it('debería mostrar transformaciones si existen', async () => {
    render(
      <AppContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <MemoryRouter>
          <CharacterDetails />
        </MemoryRouter>
      </AppContext.Provider>
    )

    await waitFor(() => expect(CharacterService.getById).toHaveBeenCalled())

    expect(
      screen.getByRole('heading', { name: /transformaciones/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Super Saiyan')).toBeInTheDocument()
    expect(screen.getByAltText('character.image')).toBeInTheDocument()
  })
})
