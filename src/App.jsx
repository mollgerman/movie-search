import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import useMovies from './hooks/useMovies'
import debounce from 'just-debounce-it'
import { Box, Text, FormControl, FormLabel, Input, Button, Checkbox } from '@chakra-ui/react'

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
    <Box className="page"
      display='flex'
      alignItems='center'
      justifyContent='start'
      maxWidth='60vw'
      minHeight='100vh'
      pt='10vh'
      bgColor='teal900'
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        px='2rem'
        flexDirection='column'
        mb='2rem'
      >
        <Text fontSize='5xl' mb='2rem'>Movie Searcher</Text>
        <FormControl className="form" onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            value={search}
            type="text"
            name="query"
            id=""
            placeholder='Avengers, Fast & Furious'
            width='40vw'
          />

          <Button type="submit" mb='3.5px' ml='1rem'>Search</Button>

          <Box display='flex' width='fit-content' mt='5px' bg='gray.200' borderRadius='5px' pt='5px' px='15px'>
            <FormLabel>Sort by year</FormLabel>
            <Checkbox onChange={handleSort} checked={sort} border='white' />
          </Box>
        </FormControl>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Box>

      <Box
        display='flex'
        alignItems='center'
      >
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </Box>
    </Box>
  )
}

export default App
