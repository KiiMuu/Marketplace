import DashboardLayout from 'components/user/DashboardLayout';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { AddOutlined } from '@mui/icons-material';

const DashboardSeller = () => {
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
						startIcon={<AddOutlined fontSize='small' />}
					>
						Add New
					</Button>
				</Grid>
			</Box>
		</DashboardLayout>
	);
};

export default DashboardSeller;
