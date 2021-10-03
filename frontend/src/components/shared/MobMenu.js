import { Link } from 'react-router-dom';
import { Menu, MenuItem, Typography, ListItemIcon } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import DashboardCustomize from '@mui/icons-material/DashboardCustomize';

const MobMenu = ({
	mobileMoreAnchorEl,
	isMobileMenuOpen,
	handleMobileMenuClose,
	userInfo,
	handleMenuClose,
	handleLogout,
}) => {
	return (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id='mobMenu'
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{!userInfo && [
				<MenuItem onClick={handleMenuClose} key='1'>
					<ListItemIcon>
						<PersonAddOutlinedIcon fontSize='small' />
					</ListItemIcon>
					<Typography
						variant='span'
						noWrap
						sx={{
							textDecoration: 'none',
						}}
						component={Link}
						to='/register'
						color='inherit'
					>
						Register
					</Typography>
				</MenuItem>,
				<MenuItem onClick={handleMenuClose} key='2'>
					<ListItemIcon>
						<LoginOutlinedIcon fontSize='small' />
					</ListItemIcon>
					<Typography
						variant='span'
						noWrap
						sx={{
							textDecoration: 'none',
						}}
						component={Link}
						to='/login'
						color='inherit'
					>
						Login
					</Typography>
				</MenuItem>,
			]}
			{userInfo && [
				<MenuItem onClick={handleMenuClose} key='3'>
					<ListItemIcon>
						<DashboardCustomize fontSize='small' />
					</ListItemIcon>
					<Typography
						variant='span'
						noWrap
						component={Link}
						to='/user/dashboard'
						sx={{
							textDecoration: 'none',
						}}
						color='inherit'
					>
						Dashboard
					</Typography>
				</MenuItem>,
				<MenuItem onClick={handleLogout} key='4'>
					<ListItemIcon>
						<LogoutOutlined fontSize='small' />
					</ListItemIcon>
					<Typography
						variant='span'
						noWrap
						sx={{
							textDecoration: 'none',
						}}
						color='inherit'
					>
						Logout
					</Typography>
				</MenuItem>,
			]}
		</Menu>
	);
};

export default MobMenu;
