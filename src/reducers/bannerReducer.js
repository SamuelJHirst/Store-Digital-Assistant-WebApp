const initialState = {
    banner: {}
};

export default function bannerReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BANNER':
            return {
                ...state,
                banner: action.payload
            };
        default:
            return state;
    }
}