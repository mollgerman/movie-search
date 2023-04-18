import React from 'react'
import { Text, UnorderedList, ListItem } from '@chakra-ui/react'

const ListOfMovies = ({ movies }) => {
  return (
    <UnorderedList
      display='flex'
      flexDir='row'
      flexWrap='wrap'
      gap='4rem'
    >
      {movies.map(movie => (
        <ListItem key={movie.id} alignSelf='center' m='auto'>
          <Text fontSize='2xl' fontWeight='bold'>{movie.title}</Text>
          <Text fontSize='lg' fontWeight='bold'>{movie.year}</Text>
          <img src={movie.poster} alt={movie.title} />
        </ListItem>
      ))}
    </UnorderedList>
  )
}

const NoMovies = () => {
  return (
    <Text fontSize='2xl'>No movies were found for this search.</Text>
  )
}

export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0
  return (
    hasMovies
      ? <ListOfMovies movies={movies}/>
      : <NoMovies />
  )
}
