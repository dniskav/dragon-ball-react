import { useEffect, useState } from 'react';
import './App.css';
import { AbcCard, AbcContainer, AbcProgressBar } from 'abc-styles';
import { FavoritesBtn, SearchBox } from './ui';
import { useHttpInterceptor } from './infraestructure/httpInterceptor';

function App() {
  const [favorites, setFavorites] = useState(false);
  const [characters, setCharacters] = useState<undefined[]>([]);
  const [progress, status] = useHttpInterceptor();

  const searchValue = (term: string): undefined[] => {
    //TODO: search value on the database
    const result = new Array(Math.floor(Math.random() * 100) + 1).fill(term);
    return result;
  };

  const filterFavorites = () => {
    console.log('filter favorites');
  }

  useEffect(() => {
    fetch('https://dragonball-api.com/api/characters')
      .then(response => response.json())
      .then(data => setCharacters(data.items));
  }, []);

  return (
    <div>
      <AbcContainer row header>
        <div className="header-content">
          <img className="logo" src="images/logo.png" alt="logo" />

          <FavoritesBtn onClick={filterFavorites} />
        </div>

      </AbcContainer>
      <AbcProgressBar progress={progress} />

      <AbcContainer col secondary>
        <div className='contentBody'>
          hola: {progress}
          <SearchBox doSearch={searchValue} />

          <AbcCard label="titulo 1" isFavorite={false}>
            <img src="https://picsum.photos/188/245" alt="Card 1" />
          </AbcCard>
        </div>
      </AbcContainer>
    </div>
  );
}

export default App;
