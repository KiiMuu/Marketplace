import { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onLogout } from 'state/user/userSlice';
import HideOnscroll from './HideOnScroll';
import MobMenu from './MobMenu';
import {
	AppBar,
	IconButton,
	MenuItem,
	Toolbar,
	Typography,
	ListItemIcon,
} from '@mui/material';
import { Box } from '@mui/system';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';

const Navigation = () => {
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const dispatch = useDispatch();
	const { userInfo } = useSelector(state => state.user);
	const history = useHistory();

	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMobileMenuClose = useCallback(() => {
		setMobileMoreAnchorEl(null);
	}, []);

	const handleMobileMenuOpen = useCallback(e => {
		setMobileMoreAnchorEl(e.currentTarget);
	}, []);

	const handleMenuClose = useCallback(() => {
		handleMobileMenuClose();
	}, [handleMobileMenuClose]);

	const handleLogout = useCallback(() => {
		dispatch(onLogout());
		setMobileMoreAnchorEl(null);
		window.localStorage.removeItem('marketUser');
		history.push('/login');
	}, [dispatch, history]);

	const renderNavItems = () => (
		<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
			{!userInfo && (
				<>
					<MenuItem>
						<ListItemIcon>
							<PersonAddOutlinedIcon
								fontSize='small'
								style={{ color: '#fff' }}
							/>
						</ListItemIcon>
						<Typography
							variant='span'
							noWrap
							component={Link}
							to='/register'
							color='inherit'
							sx={{
								display: {
									xs: 'none',
									sm: 'block',
								},
								textDecoration: 'none',
							}}
						>
							Register
						</Typography>
					</MenuItem>
					<MenuItem>
						<ListItemIcon>
							<LoginOutlinedIcon
								fontSize='small'
								style={{ color: '#fff' }}
							/>
						</ListItemIcon>
						<Typography
							variant='span'
							noWrap
							component={Link}
							to='/login'
							color='inherit'
							sx={{
								display: {
									xs: 'none',
									sm: 'block',
								},
								textDecoration: 'none',
							}}
						>
							Login
						</Typography>
					</MenuItem>
				</>
			)}
			{userInfo && (
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<LogoutOutlined
							fontSize='small'
							style={{ color: '#fff' }}
						/>
					</ListItemIcon>
					<Typography
						variant='span'
						noWrap
						color='inherit'
						sx={{
							display: {
								xs: 'none',
								sm: 'block',
							},
							textDecoration: 'none',
						}}
					>
						Logout
					</Typography>
				</MenuItem>
			)}
		</Box>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<HideOnscroll>
				<AppBar position='fixed'>
					<Toolbar>
						<Typography
							variant='h6'
							noWrap
							component={Link}
							to='/'
							color='inherit'
							style={{ textDecoration: 'none' }}
						>
							HBA
						</Typography>
						<Box sx={{ flexGrow: 1 }} />

						{renderNavItems()}
						{/* mobile box */}
						<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size='large'
								aria-label='show more'
								aria-controls='mobMenu'
								aria-haspopup='true'
								onClick={handleMobileMenuOpen}
								color='inherit'
							>
								<MenuOutlinedIcon fontSize='medium' />
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>
			</HideOnscroll>
			<MobMenu
				mobileMoreAnchorEl={mobileMoreAnchorEl}
				isMobileMenuOpen={isMobileMenuOpen}
				handleMobileMenuClose={handleMobileMenuClose}
				userInfo={userInfo}
				handleMenuClose={handleMenuClose}
				handleLogout={handleLogout}
			/>
		</Box>
	);
};

export default Navigation;
