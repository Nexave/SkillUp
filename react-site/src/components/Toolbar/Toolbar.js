import React from 'react';
import PT from 'prop-types';

// import { GlobalContext } from '../../context/GlobalState';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Navigation from '../Navigation/Navigation';
import './Toolbar.scss';

const Toolbar = ({
    search,
    isSearching,
    isAuthenticated,
    onChange,
    searchMovies,
    logoutUser
}) => (
    <div className="toolbar">
        {
            isAuthenticated
                ? (
                    <>
                        <Input
                            name="search"
                            placeholder="Search..."
                            value={search}
                            onChange={onChange}
                        />

                        <Navigation logoutUser={logoutUser} />

                        <Button
                            isDisabled={isSearching}
                            onClick={searchMovies}
                        >
                            { isSearching ? 'Searching...' : 'Search' }
                        </Button>
                    </>
                )
                : <h1 className="toolbar__title">Welcome to our App!</h1>
        }
    </div>
);

// const Toolbar = ({
//     search,
//     isSearching,
//     onChange,
//     searchMovies
// }) => (
//     <div className="toolbar">
//         <GlobalContext.Consumer>
//             {context => {
//                 console.log('[context]', context);

//                 return (
//                     <>
//                         <Input
//                             name="search"
//                             placeholder="Search..."
//                             value={search}
//                             onChange={onChange}
//                         />

//                         <Navigation />

//                         <Button
//                             isDisabled={isSearching}
//                             onClick={searchMovies}
//                         >
//                             { isSearching ? 'Searching...' : 'Search' }
//                         </Button>
//                     </>
//                 )
//             }}
//         </GlobalContext.Consumer>
//     </div>
// );

// class Toolbar extends Component {
//     static contextType = GlobalContext;

//     componentDidMount() {
//         console.log('[this.context]', this.context);
//     }
    
//     render() {
//         const {
//             search,
//             isSearching,
//             onChange,
//             searchMovies
//         } = this.props;

//         return (
//             <div className="toolbar">
//                 <Input
//                     name="search"
//                     placeholder="Search..."
//                     value={search}
//                     onChange={onChange}
//                 />

//                 <Navigation />

//                 <Button
//                     isDisabled={isSearching}
//                     onClick={searchMovies}
//                 >
//                     { isSearching ? 'Searching...' : 'Search' }
//                 </Button>
//             </div>
//         );
//     }
// }

Toolbar.propTypes = {
    search: PT.string.isRequired,
    isSearching: PT.bool.isRequired,
    isAuthenticated: PT.bool.isRequired,
    onChange: PT.func.isRequired,
    searchMovies: PT.func.isRequired,
    logoutUser: PT.func.isRequired
};

export default Toolbar;
