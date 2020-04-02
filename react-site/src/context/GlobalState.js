import React, { createContext, Component } from 'react';

export const GlobalContext = createContext({
    name: 'John',
    age: 23
});

class GlobalState extends Component {
    state = {
        name: 'Mike',
        age: 53
    }

    render() {
        const { name, age } = this.state;
        const { children } = this.props;

        return (
            <GlobalContext.Provider value={{
                fullName: name,
                fullAge: age
            }}>
                {children}
            </GlobalContext.Provider>
        );
    }
}

export default GlobalState;
