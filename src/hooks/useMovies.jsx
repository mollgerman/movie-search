import { useState, useRef, useCallback, useMemo } from 'react'
import { searchMovies } from '../services/movies'
// https://www.omdbapi.com/?s=avengers&apikey=cbbe3ca7

export default function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  // el error no se usa pero puedes implementarlo
  // si quieres:
  const [, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      // tanto en el try como en el catch
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => b.year.localeCompare(a.year))
      : movies
  }, [sort, movies])
  return { movies: sortedMovies, getMovies, loading }
}
