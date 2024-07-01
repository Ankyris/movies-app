import { useEffect, useState } from 'react'
import './App.css'
import MovieCard from './MovieCard';

const API_URL = 'https://omdbapi.com?apikey=fe2f6c44';

function App() {
  
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    console.log(movies)
  }

  useEffect(() => {
    searchMovies('Batman');
  }, [])

  return (
    <div className='app'>
      <h1>PipedPiper's Moive Center</h1>

      <div className='search'>
        <input placeholder='Search for Movies' value={searchTerm}
        onChange={(e) => {setSearchTerm(e.target.value) }}
        />

        <img src='https://media.geeksforgeeks.org/wp-content/uploads/20230626112934/search.png'
        alt='serach icon'
        onClick={() => searchMovies(searchTerm)}
        />

      </div>

      {
        movies?.length > 0
          ? (
            <div className='container'>
              {movies.map(movie => (
                <MovieCard movie={movie} key={movie.imdbID}/>
              ))}
            </div>
          ) : (
            <div className='empty'>
              <h2>No Movies found</h2>
            </div>
          )
      }
    </div>
  )
}

export default App
