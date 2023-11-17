const initialState = {
    apiToken: '',
    apiUser: {},
    invalidCredentials: false,
    serverError: false
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                apiToken: action.payload
            };
        case 'SET_USER':
            return {
                ...state,
                apiUser: action.payload
            }
        case 'INVALID_CREDENTIALS':
            return {
                ...state,
                invalidCredentials: action.payload
            }
        case 'SERVER_ERROR':
            return {
                ...state,
                serverError: action.payload
            }
        default:
            return state;
    }
}