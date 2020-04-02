import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';

import Tooltip from '../UI/Tooltip/Tooltip';
import './SimilarMovies.scss';

const SimilarMovies = ({ movies }) => {
    if (!movies) return null;

    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className="similar-movies">
            {movies.map(({ id, poster_path, original_title }) => (
                <Link
                    to={`/movies/${id}`}
                    key={id}
                >
                    <Tooltip
                        id={id}
                        content={original_title}
                        place="left"
                    >
                        <div className="similar-movies__movie" key={id}>
                            <img
                                src={baseUrl + poster_path}
                                alt={original_title}
                                className="similar-movies__img"
                            />
                        </div>
                    </Tooltip>
                    
                </Link>
            ))}
        </div>
    );
};

SimilarMovies.propTypes = {
    movies: PT.arrayOf(PT.shape({
        id: PT.number.isRequired,
        imageSrc: PT.string,
        title: PT.string.isRequired
    }))
};

export default SimilarMovies;
