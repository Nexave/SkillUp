import React from 'react';
import PT from 'prop-types';

import Movie from './Movie/Movie';
import './Movies.scss';

const Movies = ({ movies }) => {
    if (!movies) return null;

    return (
        <div className="movies">
            {movies.map(movie => (
                <Movie
                    key={movie.id}
                    movie={movie}
                />
            ))}
        </div>
    );
};

Movies.propTypes = {
    movies: PT.arrayOf(PT.shape({
        id: PT.number.isRequired,
        poster_path: PT.string,
        original_title: PT.string.isRequired,
        release_date: PT.string.isRequired
    }))
};

export default Movies;
