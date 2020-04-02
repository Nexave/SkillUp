import React from 'react';
import PT from 'prop-types';

import './Button.scss';

const Button = ({
    type = 'button',
    isDisabled = false,
    children,
    onClick
}) => (
    <button
        className="button"
        disabled={isDisabled}
        type={type}
        onClick={onClick}
    >
        {children}
    </button>
);

Button.propTypes = {
    type: PT.oneOf(['submit', 'button']),
    isDisabled: PT.bool,
    children: PT.string.isRequired,
    onClick: PT.func
};

export default Button;
