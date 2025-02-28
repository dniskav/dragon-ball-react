import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { CharacterService } from '../../../modules/Character/application/CharacterService'
import { CharacterDetail } from '../../../modules/Character/domain/CharacterTypes'
import { AbcContainer } from 'abc-styles'
import styles from './CharacterDetails.module.css'
import HeartIconRed from '/src/assets/HeartIconRed.svg'
import HeartIconStroke from '/src/assets/HeartIconStroke.svg'
import { useAppContext } from '../../../context/AppContext'

const CharacterDetails = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState<CharacterDetail>()
  const { state, dispatch } = useAppContext()
  const [stroke, setStroke] = useState(false)

  const checkFav = useCallback(
    (char: CharacterDetail) => {
      if (state.favoriteCharacters.find((c) => c.id === char?.id)) {
        setStroke(false)
      } else {
        setStroke(true)
      }
    },
    [state.favoriteCharacters]
  )

  useEffect(() => {
    CharacterService.getById(Number(id)).then((data) => {
      setCharacter(data)
      checkFav(data)
    })
  }, [checkFav, id])

  useEffect(() => {
    checkFav(character)
  }, [character, checkFav])

  const addToFavorites = (character: CharacterDetail) => {
    if (state.favoriteCharacters.find((c) => c.id === character.id)) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: character.id })
      return
    }
    dispatch({ type: 'ADD_FAVORITE', payload: character })
  }

  return (
    <>
      <AbcContainer row primary>
        <div className={`${styles.hero} ${styles.heroPadding}`}>
          <div className={styles.imageContainer}>
            <img src={character?.image} alt="character.image" />
          </div>

          <div className={styles.characterDetails}>
            <div className={styles.characterDetailsTitle}>
              <h1>{character?.name}</h1>
              <div
                className={styles.favoriteBtn}
                onClick={() => addToFavorites(character)}
              >
                <img
                  src={stroke ? HeartIconStroke : HeartIconRed}
                  alt="heart"
                />
              </div>
            </div>
            <p>{character?.description}</p>
          </div>
        </div>
      </AbcContainer>

      <AbcContainer col secondary>
        <div className={`${styles.transformations} ${styles.heroPadding}`}>
          <h2>Transformaciones</h2>
          {character?.transformations.length > 0 && (
            <div className={styles.slider}>
              {character?.transformations.map((t) => (
                <div key={t.id} className={styles.transformation}>
                  <div className={styles.transformationImageContainer}>
                    <img className={styles.transformationImage} src={t.image} />
                  </div>

                  <span>{t.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </AbcContainer>
    </>
  )
}

export default CharacterDetails
