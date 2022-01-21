export const trimWord = (word) => {
	let length = 20;
	return word.length > length ? word.substring(0, length) + '...' : word;
};
