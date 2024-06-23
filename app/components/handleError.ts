import axios from 'axios';

export const handleError = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		if (error.response) {
			switch (error.response.status) {
				case 400:
					return error.response.data.error.issues[0].message;
				case 401:
					return error.response.data.message;
				case 500:
					return '500 Internal Server Error';
			}
		} else {
			return 'An unexpected Error occurred, try again later';
		}
	} else {
		return 'Sorry, try again later';
	}
};
