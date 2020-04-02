import React from 'react';
import { NavLink } from 'react-router-dom';
import PT from 'prop-types';

import './Navigation.scss';

const links = [
    {
        id: 1,
        url: '/',
        exact: true,
        title: 'Home'
    },
    {
        id: 2,
        url: '/favorite',
        title: 'Favorite'
    },
    {
        id: 3,
        title: 'Logout'
    }
];

const Navigation = ({ logoutUser }) => (
    <div className="navigation">
        <ul className="navigation__list">
            {links.map(({ id, url, exact, title }) => {
                if (!url) {
                    return (
                        <li
                            key={id}
                            className="navigation__list-item"
                            onClick={logoutUser}
                        >
                            <span className="navigation__link">
                                {title}
                            </span>
                        </li>
                    );
                }

                return (
                    <li className="navigation__list-item" key={id}>
                        <NavLink
                            to={url}
                            exact={exact}
                            className="navigation__link"
                            activeClassName="navigation__link_active"
                        >
                            {title}
                        </NavLink>
                    </li>
                );
            })}
        </ul>
    </div>
);

Navigation.propTypes = {
    logoutUser: PT.func.isRequired
};

export default Navigation;
