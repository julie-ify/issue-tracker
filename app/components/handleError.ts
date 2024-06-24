import axios from 'axios';

export const handleError = (error: any) => {
	if (axios.isAxiosError(error)) {
		if (error.response) {
			return error.response.data.error.message || 'An error occurred';
		} else {
			return 'Network error';
		}
	} else {
		return 'An unexpected error occurred';
	}
};
