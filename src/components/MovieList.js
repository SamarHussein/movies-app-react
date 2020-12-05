import React from 'react';
import RemoveFavourites from './RemoveFromFavourites';


const MovieList = ({movies, favouriteComponent, handleFavourites}) => {
	const FavouriteComponent = favouriteComponent;
	//const RemoveFavouriteComponent = removeFromFavourites;
	
	return (
		<>
			{movies.map((movie, index) => (
				<div key={index} className='image-container d-flex justify-content-start m-3'>
					<img src={movie.Poster} alt='movie'></img>
					<div
						onClick={()=>{handleFavourites(movie)}}
						className='overlay d-flex align-items-center justify-content-center'>
						<FavouriteComponent />
						
					</div>
				
				</div>
			))}
		</>
	);
};

export default MovieList;