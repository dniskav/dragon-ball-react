import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CharacterService } from '../../modules/Character/application/CharacterService'
import { CharacterDetail } from '../../modules/Character/domain/CharacterTypes'

const CharacterDetails = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState<CharacterDetail>({})

  useEffect(() => {
    CharacterService.getById(Number(id)).then((data) => {
      setCharacter(data)
    })
  }, [id])

  return (
    <div className="contentBody">
      Character Details {JSON.stringify(character)}
    </div>
  )
}

export default CharacterDetails
