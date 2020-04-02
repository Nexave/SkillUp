import React, { Component } from 'react';
import Axios from 'axios';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from './containers/Auth/Auth';
import GlobalState from './context/GlobalState';
import FullMovie from './components/FullMovie/FullMovie';
import Toolbar from './components/Toolbar/Toolbar';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';
import { fetchMovies, getSimilarMovies } from './store/actions/movies';
import { saveAuthenticatedUser, logoutUser } from './store/actions/auth';
import './App.scss';
import Timer from './components/Timer/Timer';

// const Spinner = ({ text, history }) => {
//     return (
//         <>
//             <button onClick={() => {
//                 history.push('/favorite');
//             }}>
//                 MOVE TO FAVORITE PAGE
//             </button>

//             <div className="spinner">{text}...</div>
//         </>
//     );
// };

const axios = Axios.create({
    baseURL: 'https://react-world-movies.firebaseio.com'
});

class App extends Component {
    state = {
        search: ''
    }

    componentDidMount() {
        const { fetchMovies, saveAuthenticatedUser, history } = this.props;

        const idToken = localStorage.getItem('idToken');

        if (idToken) {
            saveAuthenticatedUser(idToken);
        } else {
            return history.push('/auth');
        }

        fetchMovies('Harry Potter');
    }

    componentDidUpdate(prevProps) {
        const { fetchMovies, isAuthenticated } = this.props;

        if (!prevProps.isAuthenticated && isAuthenticated) {
            fetchMovies('Harry Potter');
        }
    }

    onChangeInputHandler = e => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    searchMoviesHandler = () => {
        const { search } = this.state;
        const { fetchMovies } = this.props;

        fetchMovies(search);
    }

    logout = () => {
        const { logoutUser, history } = this.props;

        logoutUser();
        history.push('/auth');
    }

    addMovieToFavorite = movieId => {
        const { movies } = this.props;

        const favoriteMovie = movies.find(({ id }) => id === movieId);

        axios.post('/favoriteMovies.json', favoriteMovie)
            .then(response => {
                console.log('[response.data]', response.data);
            })
            .catch(error => {
                console.log('[error]', error);
            });
    }

    render() {
        const { search } = this.state;
        const {
            movies,
            isSearching,
            similarMovies,
            getSimilarMovies,
            isAuthenticated
        } = this.props;

        return (
            <div className="app">
                <div className="app__wrapper">
                    <GlobalState>
                        <Toolbar
                            search={search}
                            isSearching={isSearching}
                            isAuthenticated={isAuthenticated}
                            onChange={this.onChangeInputHandler}
                            searchMovies={this.searchMoviesHandler}
                            logoutUser={this.logout}
                        />
                    </GlobalState>

                    {/* <Timer /> */}

                    <Switch>
                        {/* {
                            !isAuthenticated &&
                                <Redirect to="/auth" />
                        } */}

                        {
                            !isAuthenticated &&
                                <Route path="/auth" component={Auth} />
                        }

                        <Route path="/favorite" render={props => {
                            return <h1>Favorite</h1>;

                            // return (
                            //     <Spinner
                            //         {...props}
                            //         // history={props.history}
                            //         // location={props.location}
                            //         // match={props.match}
                            //         text="Hello World"
                            //     />
                            // );
                        }} />

                        <Route path="/movies/:movieId" render={({ match }) => (
                            <FullMovie
                                match={match}
                                movies={movies}
                                similarMovies={similarMovies}
                                getSimilarMovies={getSimilarMovies}
                                addMovieToFavorite={this.addMovieToFavorite}
                            />
                        )} />

                        <Route path="/logout" render={() => (
                            <h1>Logout</h1>
                        )} />

                        <Route path="/404" render={() => (
                            <h1>Page is not found!</h1>
                        )} />

                        <Route path="/" exact render={() => (
                            <Movies movies={movies} />
                        )} />

                        {
                            isAuthenticated &&
                                <Redirect from="/auth" to="/" />
                        }
                        
                        <Redirect to="/404" />
                    </Switch>
                </div>
    
                <Footer />
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     console.log('[state]', state);

//     return {
//         abc: state.name,
//         xyz: state.age
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         changeUserName: newName => {
//             dispatch(actions.changeUserName(newName));
//         }
//     };
// };

export default connect(
    state => ({
        movies: state.movies.movies,
        similarMovies: state.movies.similarMovies,
        isSearching: state.movies.isSearching,
        isAuthenticated: !!state.auth.idToken
    }),
    { fetchMovies, getSimilarMovies, saveAuthenticatedUser, logoutUser }
    // mapDispatchToProps
)(withRouter(App));

// export default withRouter(App);
