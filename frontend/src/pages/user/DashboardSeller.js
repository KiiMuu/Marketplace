import { useState } from 'react';
import DashboardLayout from 'components/user/DashboardLayout';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { AddOutlined } from '@mui/icons-material';
import AddNewHotel from 'components/user/AddNewHotel';

const DashboardSeller = () => {
	const [open, setOpen] = useState(false);

	return (
		<DashboardLayout>
			<Box sx={{ marginTop: '20px' }}>
				<Grid
					container
					spacing={[0, 2]}
					justifyContent='space-between'
					flexWrap='wrap'
				>
					<Typography variant='h6' fontWeight='bold'>
						Your Hotels
					</Typography>
					<Button
						variant='contained'
						disableElevation
						size='small'
						startIcon={<AddOutlined fontSize='small' />}
						onClick={() => setOpen(true)}
					>
						Add New
					</Button>
					<AddNewHotel open={open} setOpen={setOpen} />
				</Grid>
			</Box>
		</DashboardLayout>
	);
};

export default DashboardSeller;
