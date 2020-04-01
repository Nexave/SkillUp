import axios from 'axios';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Profile from '../../Profile/Profile';
import './AuthContent.scss';

const SIGN_IN = 'Sign In';
const SIGN_UP = 'Sign Up';

class AuthContent {
    constructor() {
        this.mode = SIGN_IN;

        this.authContent = document.createElement('form');
        this.switchModeBtn = document.createElement('span');
        this.title = document.createElement('h1');

        this.email = new Input({
            name: 'email',
            placeholder: 'E-mail'
        });

        this.password = new Input({
            type: 'password',
            name: 'password',
            placeholder: 'Password'
        });

        this.submitBtn = new Button({
            type: 'submit',
            text: 'Submit'
        });

        this.authContent.autocomplete = 'off';
        this.authContent.className = 'auth-content';
        this.title.className = 'auth-content__title';
        this.title.textContent = SIGN_IN;
        this.switchModeBtn.className = 'auth-content__switch-btn';
        this.switchModeBtn.textContent = `Switch to ${SIGN_UP}`;

        this.authContent.append(
            this.title,
            this.email,
            this.password,
            this.submitBtn,
            this.switchModeBtn
        );

        this.authContent.addEventListener(
            'submit',
            this.onSubmitHandler.bind(this)
        );

        this.switchModeBtn.addEventListener(
            'click',
            this.switchModeHandler.bind(this)
        );

        return this.authContent;
    }

    // sendRequest(url, method, body) {
    //     return new Promise((resolve, reject) => {
    //         const xhr = new XMLHttpRequest();

    //         xhr.open(method, url, true);

    //         if (method === 'POST') {
    //             xhr.setRequestHeader('Content-Type', 'application/json');
    //         }

    //         xhr.responseType = 'json';

    //         xhr.addEventListener('load', () => {
    //             resolve(xhr.response);
    //         });

    //         xhr.addEventListener('error', () => {
    //             reject(new Error('Something went wrong...'));
    //         });

    //         // const formData = new FormData();

    //         // formData.append('hello', 'world');
    //         // formData.set('hello', 'world');

    //         xhr.send(body ? JSON.stringify(body) : null);
    //     });
    // }

    onSubmitHandler(e) {
        e.preventDefault();

        const user = {};
        const form = e.target;

        for (const element of form.elements) {
            if (element.tagName !== 'INPUT') continue;

            const { name, value } = element;

            user[name] = value;
        }

        axios.post('https://jsonplaceholder.typicode.com/users', user)
            .then(response => {
                const { email } = response.data;

                const auth = document.querySelector('.auth');
                const modal = auth.querySelector('.modal');
                const backdrop = auth.querySelector('.backdrop');

                modal.remove();
                backdrop.remove();
                auth.replaceWith(new Profile(email));
            })
            .catch(error => {
                console.log('[error]', error);
            });

        // this.sendRequest('https://jsonplaceholder.typicode.com/users', 'POST', user)
        //     .then(response => {
        //         console.log('[response]', response);
        //     })
        //     .catch(error => {
        //         console.log('[error]', error);
        //     });

        // fetch('https://jsonplaceholder.typicode.com/posts', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(user)
        // })
        //     .then(response => response.json())
        //     .then(posts => {
        //         console.log('[posts]', posts);
        //     })
        //     .catch(error => {
        //         console.log('[error]', error);
        //     });
    }

    switchModeHandler() {
        this.email.value = '';
        this.password.value = '';

        if (this.mode === SIGN_IN) {
            this.title.textContent = SIGN_UP;
            this.switchModeBtn.textContent = `Switch to ${SIGN_IN}`;

            const firstName = new Input({
                name: 'firstName',
                placeholder: 'First Name'
            });

            const lastName = new Input({
                name: 'lastName',
                placeholder: 'Last Name'
            });

            const age = new Input({
                type: 'number',
                name: 'age',
                placeholder: 'Age'
            });

            const confirmPassword = new Input({
                type: 'password',
                name: 'confirmPassword',
                placeholder: 'Confirm Password'
            });

            this.title.after(firstName, lastName, age);
            this.submitBtn.before(confirmPassword);

            this.mode = SIGN_UP;
        } else {
            this.title.textContent = SIGN_IN;
            this.switchModeBtn.textContent = `Switch to ${SIGN_UP}`;

            this.authContent.innerHTML = '';

            this.authContent.append(
                this.title,
                this.email,
                this.password,
                this.submitBtn,
                this.switchModeBtn
            );

            this.mode = SIGN_IN;
        }
    }
}

export default AuthContent;
