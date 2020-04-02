import React from 'react';
import PT from 'prop-types';

import './Input.scss';

const Input = ({
    additionalClasses,
    id,
    type = 'text',
    name,
    placeholder,
    value,
    onChange,
    onBlur
}) => (
    <input
        id={id}
        className={`input ${ additionalClasses || '' }`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
    />
);

Input.propTypes = {
    additionalClasses: PT.string,
    id: PT.string,
    type: PT.oneOf(['text', 'password', 'number']),
    name: PT.string,
    placeholder: PT.string,
    value: PT.string.isRequired,
    onChange: PT.func.isRequired,
    onBlur: PT.func
};

export default Input;
