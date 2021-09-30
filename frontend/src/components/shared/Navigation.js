import { useState } from 'react';
import { Link } from 'react-router-dom';
import HideOnscroll from './HideOnScroll';
import {
	AppBar,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
	ListItemIcon,
} from '@mui/material';
import { Box } from '@mui/system';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

const Navigation = () => {
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMobileMenuOpen = e => {
		setMobileMoreAnchorEl(e.currentTarget);
	};

	const handleMenuClose = () => {
		handleMobileMenuClose();
	};

	const renderMobileMenu = (
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
			<MenuItem onClick={handleMenuClose}>
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
			</MenuItem>
			<MenuItem onClick={handleMenuClose}>
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
			</MenuItem>
		</Menu>
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
							Marketplace
						</Typography>
						<Box sx={{ flexGrow: 1 }} />
						<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
										display: { xs: 'none', sm: 'block' },
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
										display: { xs: 'none', sm: 'block' },
										textDecoration: 'none',
									}}
								>
									Login
								</Typography>
							</MenuItem>
						</Box>
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
			{renderMobileMenu}
		</Box>
	);
};

export default Navigation;
