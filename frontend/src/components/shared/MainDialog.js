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

const MainDialog = ({ open, setOpen, dialogTitle, children }) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Dialog
			TransitionComponent={Transition}
			keepMounted
			fullScreen={fullScreen}
			open={open}
			onClose={() => setOpen(false)}
		>
			<DialogTitle>{dialogTitle}</DialogTitle>
			{children}
		</Dialog>
	);
};

export default MainDialog;
