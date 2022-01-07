import {
	Dialog,
	DialogTitle,
	Slide,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />;
});

const MainDialog = ({ open, setOpen, dialogTitle, maxWidth, children }) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Dialog
			TransitionComponent={Transition}
			keepMounted
			fullScreen={fullScreen}
			open={open}
			maxWidth={maxWidth}
			fullWidth
			onClose={() => setOpen(false)}
		>
			<DialogTitle sx={{ paddingBottom: '2px' }}>
				{dialogTitle}
			</DialogTitle>
			{children}
		</Dialog>
	);
};

export default MainDialog;
