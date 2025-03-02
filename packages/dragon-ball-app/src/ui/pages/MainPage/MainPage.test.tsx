import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { AppContext } from '../../../context/AppContext'
import MainPage from './MainPage'
import { mockState } from '../../../../tests/stateMock'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('<MainPage>', () => {
  const mockDispatch = jest.fn()
  const mockNavigate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate)
  })

  it('debería renderizar correctamente con los hijos', () => {
    render(
      <AppContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <MemoryRouter>
          <MainPage>
            <div data-testid="child-element">Contenido de prueba</div>
          </MainPage>
        </MemoryRouter>
      </AppContext.Provider>
    )

    expect(screen.getByTestId('child-element')).toBeInTheDocument()
  })

  it('debería navegar a la página principal al hacer clic en el logo', () => {
    render(
      <AppContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </AppContext.Provider>
    )

    const logo = screen.getByAltText('logo')
    fireEvent.click(logo)

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('debería alternar el filtro de favoritos al hacer clic en el botón', () => {
    render(
      <AppContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </AppContext.Provider>
    )

    const favButton = screen.getByRole('button')
    fireEvent.click(favButton)

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SHOW_FAVORITES_ONLY',
      payload: !mockState.favoritesOnly,
    })
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_CURRENT_LIST' })
  })
})
