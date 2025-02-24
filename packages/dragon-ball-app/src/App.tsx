import { useState } from 'react'
import './App.css'
import { AbcButton, AbcCard, AbcText } from 'abc-styles';

function App() {
  const [count, setCount] = useState(0)
  const [favorite, setFavorite] = useState(false)
  const [nombre, setNombre] = useState("")

  return (
    <>
        <AbcText label="Nombre" id="nombreId" controlled onChange={(e) => setNombre(e)} />

        <AbcButton onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </AbcButton>

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
