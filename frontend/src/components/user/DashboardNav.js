import TabLink from 'components/muiTabsWithRouter/TabLink';
import useMUITabsWithRouter from 'hooks/useMUITabsWithRouter';
import { Tabs, useMediaQuery } from '@mui/material';

const DashboardNav = () => {
	const sm = useMediaQuery(theme => theme.breakpoints.down('sm'));
	const tabValue = useMUITabsWithRouter(
		['/user/dashboard/seller', '/user/dashboard'],
		'/user/dashboard'
	);

	return (
		<Tabs
			value={tabValue}
			textColor='secondary'
			indicatorColor='secondary'
			centered={sm ? false : true}
			scrollButtons
			allowScrollButtonsMobile
			sx={{
				background: '#fff',
				boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px',
			}}
			TabIndicatorProps={{
				style: {
					background: 'rgba(0 0 0 / 60%)',
				},
			}}
		>
			<TabLink value='/user/dashboard' label='Your Booking' />
			<TabLink value='/user/dashboard/seller' label='Your Hotels' />
		</Tabs>
	);
};

export default DashboardNav;
