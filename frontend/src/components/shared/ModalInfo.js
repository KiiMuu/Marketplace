import { forwardRef, useState } from 'react';
import {
	Box,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Slide,
	Typography,
} from '@mui/material';
import { Close, InfoOutlined } from '@mui/icons-material';
import styled from '@emotion/styled';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

const BootstrapDialogTitle = props => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: theme => theme.palette.grey[500],
					}}
				>
					<Close />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

const ModalInfo = ({ session, orderedBy }) => {
	const [open, setOpen] = useState(false);

	const handleClickToggle = () => {
		setOpen(!open);
	};

	return (
		<Box>
			<IconButton
				color='primary'
				sx={{ ml: '10px' }}
				onClick={handleClickToggle}
				title='Show payment info'
			>
				<InfoOutlined />
			</IconButton>
			<BootstrapDialog
				onClose={handleClickToggle}
				open={open}
				TransitionComponent={Transition}
			>
				<BootstrapDialogTitle onClose={handleClickToggle}>
					Payment Info
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						Payment Intent: <u>{session.payment_intent}</u>
					</Typography>
					<Typography gutterBottom>
						Payment Status: <u>{session.payment_status}</u>
					</Typography>
					<Typography gutterBottom>
						Total Amount: {session.currency}{' '}
						<u>{session.amount_total / 100}</u>
					</Typography>
					<Typography gutterBottom>
						Stripe customer id: <u>{session.customer}</u>
					</Typography>
					<Typography>
						Customer: <u>{orderedBy.name}</u>
					</Typography>
				</DialogContent>
			</BootstrapDialog>
		</Box>
	);
};

export default ModalInfo;
