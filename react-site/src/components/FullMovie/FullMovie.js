import React, { Component } from 'react';
import PT from 'prop-types';
import { Redirect } from 'react-router-dom';

import Button from '../UI/Button/Button';
import SimilarMovies from '../SimilarMovies/SimilarMovies';
import './FullMovie.scss';

class FullMovie extends Component {
    componentDidMount() {
        const { getSimilarMovies, match } = this.props;
        const { movieId } = match.params;

        getSimilarMovies(movieId);
    }
    
    render() {
        const { movies, match, similarMovies, addMovieToFavorite } = this.props;

        if (!movies) return <Redirect to="/" />;

        const { movieId } = match.params;

        const movieIndex = movies.findIndex(({ id }) => id === +movieId);

        const {
            id,
            poster_path,
            backdrop_path,
            overview,
            original_title,
            release_date
        } = movies[movieIndex];

        const baseUrl = 'https://image.tmdb.org/t/p/w500';

        return (
            <div
                className="full-movie"
                style={{ backgroundImage: `url(${baseUrl}${backdrop_path})` }}
            >
                <div className="full-movie__info">
                    <h1 className="full-movie__title">{original_title}</h1>
                    <h2 className="full-movie__release">{release_date}</h2>

                    <div className="full-movie__content">
                        <div className="full-movie__img-wrapper">
                            <img
                                className="full-movie__img"
                                src={baseUrl + poster_path}
                                alt={original_title}
                            />
                        </div>

                        <div className="full-movie__main">
                            <p className="full-movie__description">
                                {overview}
                            </p>

                            <Button onClick={() => addMovieToFavorite(id)}>
                                Add to Favorite
                            </Button>
                        </div>
                    </div>
                </div>

                <SimilarMovies movies={similarMovies} />
            </div>
        );
    }
}

FullMovie.propTypes = {
    movies: PT.arrayOf(PT.shape({
        id: PT.number.isRequired,
        backdrop_path: PT.string,
        poster_path: PT.string,
        original_title: PT.string.isRequired,
        overview: PT.string.isRequired,
        release_date: PT.string.isRequired
    })),
    similarMovies: PT.array,
    match: PT.object.isRequired,
    getSimilarMovies: PT.func.isRequired,
    addMovieToFavorite: PT.func.isRequired
};

export default FullMovie;
