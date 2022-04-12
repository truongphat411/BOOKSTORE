import {
	GET_AUTHORS,
	CREATE_AUTHOR,
} from '../constants/authorConstants';

const INITIAL_STATE = {
	authors: [],
};

const authorReducers = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_AUTHORS:
			return {
				...state,
				authors: action.payload,
			};
		case CREATE_AUTHOR:
			return {
				...state,
				authors : [...state.authors, action.payload],
			};
		default:
			return state;
	}
};

export default authorReducers;