import { Routes, Route } from 'react-router-dom'
import './App.css'
import { AppProvider } from './context/AppContext'
import CharacterDetails from './ui/pages/CharacterDetails/CharacterDetails'
import { CharacterList } from './ui/pages/CharacterList/CharacterList'
import MainPage from './ui/pages/MainPage/MainPage'

function App() {
  return (
    <AppProvider>
      <MainPage />
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </AppProvider>
  )
}

export default App
