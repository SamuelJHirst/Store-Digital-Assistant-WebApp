export const showBanner = (text, severity) => dispatch => {
	dispatch({
		type: 'SET_BANNER',
		payload: { text, severity }
	});
	setTimeout(() => {
		dispatch({
			type: 'SET_BANNER',
			payload: { text: '', severity }
		});
	}, 3000);
};