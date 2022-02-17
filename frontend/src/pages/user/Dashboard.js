import { Link } from 'react-router-dom';
import DashboardLayout from 'components/user/DashboardLayout';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Dashboard = () => {
	return (
		<DashboardLayout>
			<Box sx={{ marginTop: '20px' }}>
				<Grid
					container
					gap={1}
					justifyContent='space-between'
					flexWrap='wrap'
				>
					<Typography variant='h6' fontWeight='bold'>
						Your Booking
					</Typography>
					<Button variant='contained' disableElevation size='small'>
						<Link
							to='/'
							style={{ color: 'inherit', textDecoration: 'none' }}
						>
							Browse Hotels
						</Link>
					</Button>
				</Grid>
			</Box>
		</DashboardLayout>
	);
};

export default Dashboard;
