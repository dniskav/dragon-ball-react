import { AbcContainer } from 'abc-styles'
import { FC, ReactNode } from 'react'
import FavoritesBtn from '../../components/FavoritesBtn/FavoritesBtn'
import { useAppContext } from '../../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import styles from './MainPage.module.css'
import logo from '../../../assets/logo.png'

interface Props {
  children?: ReactNode
}

const MainPage: FC<Props> = ({ children }) => {
  const { state, dispatch } = useAppContext()
  const navigate = useNavigate()

  const filterFavorites = () => {
    dispatch({ type: 'SHOW_FAVORITES_ONLY', payload: !state.favoritesOnly })
    dispatch({ type: 'SET_CURRENT_LIST' })
  }

  return (
    <div className={styles.content}>
      <AbcContainer row header>
        <div className="header-content">
          <img
            className="logo"
            src={logo}
            alt="logo"
            onClick={() => navigate('/')}
          />

          <FavoritesBtn
            onClick={filterFavorites}
            total={state.favoriteCharacters.length}
          />
        </div>
      </AbcContainer>

      {children}
    </div>
  )
}

export default MainPage
