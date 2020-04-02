export const initialState = {
    name: 'John',
    age: 23
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_USER_NAME':
            return {
                ...state,
                name: action.newName
            }
            
        default: return state;
    }
};

export default reducer;
