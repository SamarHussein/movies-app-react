import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Heading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddToFavourites';
import RemoveFavourite from './components/RemoveFromFavourites';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue ] = useState('');
  const [favourites, setFavourites] = useState([]);
  
  const getMovies = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=fbab718`;
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson.Search)
    if (responseJson.Search) {
			setMovies(responseJson.Search);
		} 
  }

  const handleAddToFavourites = (movie) => {
    const newFavourites = [...favourites, movie];
    setFavourites(newFavourites);
    console.log('favourites',newFavourites);
    saveToLocalStorage(newFavourites);

  }
  
  const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);
    console.log(newFavouriteList)
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);

  };
  
  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

  useEffect(() => {
		getMovies(searchValue);
  }, [searchValue]);

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);
    if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	
	return (
		<div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Heading heading='Movies'/> 
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
			<div className='row'>
      <MovieList 
        movies={movies} 
        favouriteComponent={AddFavourite}
         handleFavourites={handleAddToFavourites} />
			</div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Heading heading='Favourites'/> 
      </div>
			<div className='row'>
      <MovieList 
        movies={favourites} 
        favouriteComponent={RemoveFavourite} 
        handleFavourites={removeFavouriteMovie}/>
			</div>
		</div>
	);
};

export default App; 