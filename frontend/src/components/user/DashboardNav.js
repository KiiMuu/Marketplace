import { Link } from 'react-router-dom';

const DashboardNav = () => {
	return (
		<ul style={{ marginTop: 'calc(var(--navHeight) + 20px)' }}>
			<li>
				<Link to='/user/dashboard'>Your Booking</Link>
			</li>
			<li>
				<Link to='/user/dashboard/seller'>Your Hotels</Link>
			</li>
		</ul>
	);
};

export default DashboardNav;
