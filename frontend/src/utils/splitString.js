export const splitString = str => {
	if (str.length > 200) return `${str.substring(1, 100)}...`;

	return str;
};
