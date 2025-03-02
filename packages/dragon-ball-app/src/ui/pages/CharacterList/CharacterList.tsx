import { AbcContainer, AbcProgressBar, AbcCard } from 'abc-styles'
import { SearchBox } from '../..'
import { useEffect } from 'react'
import { useAppContext } from '../../../context/AppContext'
import { CharacterService } from '../../../modules/Character/application/CharacterService'
import { CharacterListItem } from '../../../modules/Character/domain/CharacterTypes'
import { useHttpInterceptor } from '../../../infraestructure/httpInterceptor/httpInterceptor'
import { useNavigate } from 'react-router-dom'
import { useCachedFetch } from '../../../hooks/useCachedFetch'

export const CharacterList = () => {
  const { state, dispatch } = useAppContext()
  const [progress] = useHttpInterceptor()
  const { data: characters } = useCachedFetch<CharacterListItem[]>(
    'characters',
    CharacterService.getAll,
    60
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (!characters) return
    dispatch({ type: 'SET_CHARACTERS', payload: characters })
    dispatch({ type: 'SET_CURRENT_LIST' })
  }, [characters, dispatch])

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
