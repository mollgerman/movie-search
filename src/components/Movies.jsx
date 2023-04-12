import React from 'react'

const ListOfMovies = ({ movies }) => {
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))}
    </ul>
  )
}

const NoMovies = () => {
  return (
    <p>No movies were found for this search.</p>
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
