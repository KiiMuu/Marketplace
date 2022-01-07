import { useState } from 'react';

const useSnackBar = () => {
	const [open, setOpen] = useState(false);

	const handleClose = (e, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	return {
		open,
		setOpen,
		handleClose,
	};
};

export default useSnackBar;
