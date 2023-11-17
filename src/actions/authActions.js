import axios from '../helpers/axios';

export const login = loginData => dispatch => {
	axios.post('/authenticate', loginData).then(async (token) => {
		const user = await axios.get('/user/' + loginData.username, { headers: { Authorization: token.data.data } });
		dispatch({
			type: 'SET_TOKEN',
			payload: token.data.data
		});
		dispatch({
			type: 'SET_USER',
			payload: user.data.data
		});
	}, (error) => {
		if (error.response.status === 401) {
			dispatch({
				type: 'INVALID_CREDENTIALS',
				payload: true
			});
			setTimeout(() => {
				dispatch({
					type: 'INVALID_CREDENTIALS',
					payload: false
				});
			}, 3000);
		} else {
			dispatch({
				type: 'SERVER_ERROR',
				payload: true
			});
			setTimeout(() => {
				dispatch({
					type: 'SERVER_ERROR',
					payload: false
				});
			}, 3000);
		}
	});
};

export const logout = () => dispatch => {
	dispatch({
		type: 'SET_TOKEN',
		payload: ''
	});
	dispatch({
		type: 'SET_USER',
		payload: {}
	});
};