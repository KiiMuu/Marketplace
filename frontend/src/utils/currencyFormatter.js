export const currencyFormatter = data => {
	const options = {
		style: 'currency',
		currency: data.currency,
		minimumFractionDigits: 2,
	};

	// check if its a clean dollar amount -> 10, 100, 400, etc
	if (data.amount % 100 === 0) {
		options.minimumFractionDigits = 0;
	}

	const formatter = new Intl.NumberFormat('en-US', options);

	return formatter.format(data.amount);
};
