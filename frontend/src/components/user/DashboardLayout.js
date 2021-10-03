import DashboardNav from './DashboardNav';
import ConnectNav from './ConnectNav';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

const DashboardLayout = ({ children }) => {
	return (
		<Container
			sx={{ marginTop: 'calc(var(--navHeight) + 20px)' }}
			maxWidth='xl'
		>
			<Box sx={{ marginBottom: '20px' }}>
				<ConnectNav />
			</Box>
			<DashboardNav />
			<Box sx={{ p: 2 }}>{children}</Box>
		</Container>
	);
};

export default DashboardLayout;
