const showMessage = (req, res) => {
	res.status(201).json({ Home: 'This is my Home' });
};

export { showMessage };
