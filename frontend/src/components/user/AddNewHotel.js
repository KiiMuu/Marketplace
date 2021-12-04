import MainDialog from 'components/shared/MainDialog';
import {
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	TextField,
} from '@mui/material';
import { Box } from '@mui/system';

const AddNewHotel = ({ open, setOpen }) => {
	return (
		<MainDialog open={open} setOpen={setOpen} dialogTitle='Add a new hotel'>
			<DialogContent>
				<DialogContentText>
					Hotel will be added to your dahboard.
				</DialogContentText>
				<Box
					component='form'
					sx={{
						'& .MuiTextField-root': { mt: 3, width: '25ch' },
						'& .MuiTextField-root:first-of-type': { mr: 1 },
					}}
					noValidate
					autoComplete='off'
				>
					<TextField
						autoFocus
						margin='dense'
						id='name'
						label='Email Address'
						type='email'
						fullWidth
						variant='outlined'
					/>
					<TextField
						autoFocus
						margin='dense'
						id='name'
						label='Email Address'
						type='email'
						fullWidth
						variant='outlined'
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					autoFocus
					onClick={() => setOpen(false)}
					variant='outlined'
					disableElevation
					size='small'
				>
					Close
				</Button>
				<Button
					// onClick={() => setOpen(false)}
					autoFocus
					variant='contained'
					disableElevation
					size='small'
				>
					Add
				</Button>
			</DialogActions>
		</MainDialog>
	);
};

export default AddNewHotel;
