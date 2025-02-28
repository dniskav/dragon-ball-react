import { AbcContainer, AbcProgressBar, AbcCard } from 'abc-styles'
import { SearchBox } from '..'
import { useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import { CharacterService } from '../../modules/Character/application/CharacterService'
import { CharacterListItem } from '../../modules/Character/domain/CharacterTypes'
import { useHttpInterceptor } from '../../infraestructure/httpInterceptor'
import { useNavigate } from 'react-router-dom'

export const CharacterList = () => {
  const { state, dispatch } = useAppContext()
  const [progress] = useHttpInterceptor()

  const navigate = useNavigate()

  useEffect(() => {
    CharacterService.getAll().then((data: CharacterListItem[]) => {
      dispatch({ type: 'SET_CHARACTERS', payload: data })
      dispatch({ type: 'SET_CURRENT_LIST' })
    })
  }, [])

  useEffect(() => {
    const addFav = async () => {
      const one = await CharacterService.getById(1)
      const five = await CharacterService.getById(5)

      setTimeout(() => {
        dispatch({ type: 'ADD_FAVORITE', payload: one })
        dispatch({ type: 'ADD_FAVORITE', payload: five })
      }, 2000)
    }

    addFav()
  }, [])

  const filterCharacters = (term: string) => {
    dispatch({ type: 'SET_FILTER_TERM', payload: term })
    dispatch({ type: 'SET_CURRENT_LIST' })

    return state.currentList
  }

  const isFavorite = (char: CharacterListItem) => {
    return state.favoriteCharacters.find((c) => c.id === char.id) !== undefined
  }

  const showDetails = (char: CharacterListItem) => {
    navigate(`/character/${char.id}`)
    console.log(char)
  }

  return (
    <>
      <AbcProgressBar progress={progress} />

      <AbcContainer col secondary>
        <div className="contentBody">
          <SearchBox doSearch={filterCharacters} list={state.currentList} />

          <div className="AbcGrid">
            {state.currentList.map((char) => (
              <AbcCard
                label={char.name}
                isFavorite={isFavorite(char)}
                key={char.id}
                onClick={() => showDetails(char)}
              >
                <img src={char.image} alt="char.name" />
              </AbcCard>
            ))}
          </div>
        </div>
      </AbcContainer>
    </>
  )
}
