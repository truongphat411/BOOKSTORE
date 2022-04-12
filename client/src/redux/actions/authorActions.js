import { START_LOADING, STOP_LOADING } from '../constants/loadingConstants';
import {
	SHOW_ERROR_MESSAGE,
	SHOW_SUCCESS_MESSAGE,
} from '../constants/messageConstants';
import {
	GET_AUTHORS,
	CREATE_AUTHOR,
} from '../constants/authorConstants';
import axios from 'axios';

export const getAuthors = () => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const response = await axios.get('/api/author');
		dispatch({ type: STOP_LOADING });
		dispatch({ type: GET_AUTHORS, payload: response.data.authors });
	} catch (err) {
		console.log('getauthors api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}
};

export const createAuthor = formData => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		dispatch({ type: START_LOADING });
		const response = await axios.post('/api/author', formData, config);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_SUCCESS_MESSAGE,
			payload: response.data.successMessage,
		});
		dispatch({ type: CREATE_AUTHOR, payload: response.data.category });
	} catch (err) {
		console.log('createauthor api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}
};