import { useState } from 'react'
import './App.css'
import { AbcButton, AbcCard, AbcText } from 'abc-styles';
import { SearchBox } from './ui';

function App() {
  const [favorite, setFavorite] = useState(false)
  const [nombre, setNombre] = useState("")
  // const [searchResults, setSearchResults] = useState<undefined[]>([])

  const searchValue = (term: string): undefined[] => {
    //TODO: search value on the database
    const result = new Array(Math.floor(Math.random() * 100) + 1).fill(term)
    return result
  }


  return (
    <>
        <SearchBox doSearch={searchValue} />

        <AbcText label="Nombre" id="nombreId" onChange={(e) => setNombre(e)} />

        <AbcButton onClick={() => setFavorite(f => !f)}>
          fav {favorite}
        </AbcButton>

        <AbcCard label="titulo 1" isFavorite={favorite} >
          <img src="https://picsum.photos/188/245" alt="Card 1" />
        </AbcCard>

        <span>{nombre}</span>

    </>
  )
}

export default App
