export const isValidId = (id: string) => {
	// Check if `id` is a string containing only digits
	return /^\d+$/.test(id);
};