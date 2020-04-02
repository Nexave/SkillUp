import React, { Component, createRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { saveAuthenticatedUser } from '../../store/actions/auth';
import './Auth.scss';

const SIGN_IN = 'SIGN_IN';
const SIGN_UP = 'SIGN_UP';

const signInFields = [
    {
        id: 'email',
        name: 'email',
        placeholder: 'E-mail'
    },
    {
        id: 'password',
        type: 'password',
        name: 'password',
        placeholder: 'Password'
    }
];

const signUpFields = [
    {
        id: 'first-name',
        name: 'firstName',
        placeholder: 'First Name'
    },
    {
        id: 'last-name',
        name: 'lastName',
        placeholder: 'Last Name'
    },
    {
        id: 'age',
        type: 'number',
        name: 'age',
        placeholder: 'Age'
    },
    {
        id: 'email',
        name: 'email',
        placeholder: 'E-mail'
    },
    {
        id: 'password',
        type: 'password',
        name: 'password',
        placeholder: 'Password'
    },
    {
        id: 'confirm-password',
        type: 'password',
        name: 'confirmPassword',
        placeholder: 'Confirm password'
    }
];

const initialState = {
    mode: SIGN_IN,
    firstName: {
        value: '',
        errorMessage: null,
        rules: {
            isAlphabetic: true
        }
    },
    lastName: {
        value: '',
        errorMessage: null,
        rules: {
            isAlphabetic: true
        }
    },
    age: {
        value: '',
        errorMessage: null,
        rules: {
            isNumeric: true
        }
    },
    email: {
        value: '',
        errorMessage: null,
        rules: {
            email: true
        }
    },
    password: {
        value: '',
        errorMessage: null,
        rules: {
            minLength: 6
        }
    },
    confirmPassword: {
        value: '',
        errorMessage: null,
        rules: {
            minLength: 6
        }
    }
};

const firebaseKey = 'AIzaSyAwEyNLIzVoF_NSCvhgnYefirMcyLj0His';

class Auth extends Component {
    state = initialState

    formRef = createRef();

    onSubmitHandler = e => {
        e.preventDefault();

        const { email, password, mode } = this.state;

        const userData = {
            email: email.value,
            password: password.value,
            returnSecureToken: true
        };

        const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
        const url = mode === SIGN_UP ? 'signUp' : 'signInWithPassword'

        axios.post(baseUrl + url + `?key=${firebaseKey}`, userData)
            .then(response => {
                const { saveAuthenticatedUser } = this.props;
                const { idToken } = response.data;

                localStorage.setItem('idToken', idToken);

                saveAuthenticatedUser(idToken);
            })
            .catch(error => {
                console.log('[error]', error);
            });

        // console.log('[form.elements]', this.formRef.current.elements);
    }

    getTabClassName = currentTab => {
        const { mode } = this.state;

        const classes = ['auth__tab'];

        if (mode === currentTab) {
            classes.push('auth__tab_active');
        }

        return classes.join(' ');
    }

    changeActiveTab = currentTab => {
        const { mode } = this.state;

        if (mode === currentTab) return;

        this.setState({
            ...initialState,
            mode: currentTab
        });
    }

    onChangeHandler = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: {
                ...this.state[name],
                value
            }
        });
    }

    onBlurHandler = e => {
        const { name } = e.target;
        const { value, rules } = this.state[name];

        this.setState({
            [name]: {
                ...this.state[name],
                errorMessage: this.validate(value, rules)
            }
        });
    }

    validate = (value, rules) => {
        const validationFunctions = {
            email: enteredValue => {
                const regExp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/g;

                if (regExp.test(enteredValue)) return null;

                return 'Provided value should be an email address.';
            },
            minLength: (enteredValue, minValue) => {
                if (enteredValue.length >= minValue) return null;

                return `Provided value should have minimum length of ${minValue}.`;
            },
            isAlphabetic: enteredValue => {
                const regExp = /[a-zA-Z]+$/g;

                if (regExp.test(enteredValue)) return null;

                return 'Provided value should be alphabetic.';
            },
            isNumeric: enteredValue => {
                const regExp = /[0-9]+$/g;

                if (regExp.test(enteredValue)) return null;

                return 'Provided value should be numeric.';
            }
        };

        for (const key in rules) {
            const validationFunction = validationFunctions[key];

            const errorMessage = validationFunction(value, rules[key]);

            if (errorMessage) return errorMessage;
        }
    }

    render() {
        const { mode } = this.state;

        return (
            <div className="auth">
                <div className="auth__form-wrapper">
                    <div className="auth__tabs">
                        <div
                            className={this.getTabClassName(SIGN_IN)}
                            onClick={() => this.changeActiveTab(SIGN_IN)}
                        >
                            Sign In
                        </div>

                        <div
                            className={this.getTabClassName(SIGN_UP)}
                            onClick={() => this.changeActiveTab(SIGN_UP)}
                        >
                            Sign Up
                        </div>
                    </div>

                    <form
                        ref={this.formRef}
                        onSubmit={this.onSubmitHandler}
                        className="auth__form"
                        autoComplete="off"
                    >
                        {(mode === SIGN_IN ? signInFields : signUpFields)
                            .map(({ id, type, name, placeholder }) => {
                                const { value, errorMessage } = this.state[name];

                                return (
                                    <div key={id} className="auth__field">
                                        <label
                                            htmlFor={id}
                                            className="auth__label"
                                        >
                                            {placeholder}
                                        </label>
    
                                        <div className="auth__input-wrapper">
                                            <Input
                                                id={id}
                                                additionalClasses={ errorMessage && 'auth__input_error' }
                                                type={type}
                                                name={name}
                                                placeholder={placeholder}
                                                value={value}
                                                onChange={this.onChangeHandler}
                                                onBlur={this.onBlurHandler}
                                            />
    
                                            {
                                                errorMessage &&
                                                    <p className="auth__error">
                                                        {errorMessage}
                                                    </p>
                                            }
                                        </div>
                                    </div>
                                );
                            })}

                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { saveAuthenticatedUser }
)(Auth);
