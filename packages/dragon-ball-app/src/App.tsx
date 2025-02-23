import { useState } from 'react'
import './App.css'
import { AbcButton, AbcCard } from 'abc-styles';

function App() {
  const [count, setCount] = useState(0)
  const [favorite, setFavorite] = useState(false)

  return (
    <>
        <AbcButton onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </AbcButton>

        <AbcButton onClick={() => setFavorite(f => !f)}>
          fav {favorite}
        </AbcButton>

        <AbcCard label="titulo 1" isFavorite={favorite} >
          <img src="https://picsum.photos/188/245" alt="Card 1" />
        </AbcCard>
    </>
  )
}

export default App
