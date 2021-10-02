import { Link } from 'react-router-dom';
import { Menu, MenuItem, Typography, ListItemIcon } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';

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
							display: { xs: 'none', sm: 'block' },
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
							display: { xs: 'none', sm: 'block' },
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
			{userInfo && (
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<LogoutOutlined fontSize='small' />
					</ListItemIcon>
					<Typography
						variant='span'
						noWrap
						sx={{
							display: { xs: 'none', sm: 'block' },
							textDecoration: 'none',
						}}
						color='inherit'
					>
						Logout
					</Typography>
				</MenuItem>
			)}
		</Menu>
	);
};

export default MobMenu;
