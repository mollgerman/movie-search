import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import useMovies from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('Cannot search for empty movie.')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('Cannot search for movie with number')
      return
    }

    if (search.length < 3) {
      setError('Search must be at least 3 characters')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className="page">
      <header>
        <h1>Movie Searcher</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} type="text" name="query" id="" placeholder='Avengers, Fast & Furious'/>

          <button type="submit">Search</button>

        </form>
        <label>Sort by year</label>
        <input list="sort" onChange={handleSort} checked={sort} />

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
