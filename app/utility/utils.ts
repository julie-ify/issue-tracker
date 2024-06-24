export const isValidId = (id: string) => {
	// Check if `id` is a string containing only digits
	return /^\d+$/.test(id);
};

export const extractFirstLetter = (name: string) => {
	return name.split('')[0].toUpperCase();
};
