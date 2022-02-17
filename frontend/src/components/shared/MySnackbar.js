import { forwardRef } from 'react';
import { Button, IconButton, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { CloseOutlined } from '@mui/icons-material';

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const MySnackbar = ({
	open,
	handleClose,
	isCustomized = false,
	autoHideDuration = 3000,
	severity,
	customizedMsg,
	message,
	vertical = 'bottom',
	horizontal = 'left',
}) => {
	const action = (
		<>
			<Button color='secondary' size='small' onClick={handleClose}>
				UNDO
			</Button>
			<IconButton
				size='small'
				aria-label='close'
				color='inherit'
				onClick={handleClose}
			>
				<CloseOutlined fontSize='small' />
			</IconButton>
		</>
	);

	return isCustomized ? (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={handleClose}
			anchorOrigin={{ vertical, horizontal }}
		>
			<Alert onClose={handleClose} severity={severity}>
				{customizedMsg}
			</Alert>
		</Snackbar>
	) : (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={handleClose}
			message={message}
			action={action}
			anchorOrigin={{ vertical, horizontal }}
		/>
	);
};

export default MySnackbar;
