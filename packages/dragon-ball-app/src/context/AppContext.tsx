import { createContext, useContext, useReducer, ReactNode } from 'react'
import { appReducer, AppState, AppAction } from './AppReducer'

const initialState: AppState = {
  characters: [],
  filterTerm: '',
  favoriteCharacters: [],
  currentList: [],
  searchQuery: '',
  favoritesOnly: false,
}

export const AppContext = createContext<
  | {
      state: AppState
      dispatch: React.Dispatch<AppAction>
    }
  | undefined
>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context)
    throw new Error('useAppContext debe usarse dentro de un AppProvider')
  return context
}
