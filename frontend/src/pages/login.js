import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthPageWrapper } from 'styles/auth';
import {
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(prev => !prev);
	};

	const handleMouseDownPassword = e => {
		e.preventDefault();
	};

	const handleLogin = e => {
		e.preventDefault();

		alert('you submitted it');
	};

	return (
		<AuthPageWrapper onSubmit={handleLogin}>
			<div className='authContent'>
				<Typography variant='h4' gutterBottom>
					Login
				</Typography>
				<Typography variant='subtitle2' color='secondary'>
					Provide your credentials to launch it.
				</Typography>
				<FormControl sx={{ mt: 2 }} fullWidth>
					<TextField
						required
						error={false}
						color='secondary'
						label='Email'
						variant='outlined'
						placeholder='Type your email'
						size='small'
						// helperText='Incorrect entry.'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</FormControl>
				<FormControl sx={{ mt: 2 }} size='small' fullWidth>
					<InputLabel htmlFor='password' color='secondary'>
						Password
					</InputLabel>
					<OutlinedInput
						error={false}
						color='secondary'
						id='password'
						label='Password'
						placeholder='Type your password'
						type={showPassword ? 'text' : 'password'}
						// helperText='Incorrect entry.'
						value={password}
						onChange={e => setPassword(e.target.value)}
						endAdornment={
							password ? (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge='end'
									>
										{showPassword ? (
											<VisibilityOff fontSize='small' />
										) : (
											<Visibility fontSize='small' />
										)}
									</IconButton>
								</InputAdornment>
							) : null
						}
					/>
				</FormControl>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					marginTop='20px'
					spacing={2}
				>
					<LoadingButton
						loading={false}
						variant='contained'
						disableElevation
						type='submit'
					>
						Login
					</LoadingButton>
					<Button variant='outlined'>
						<Link
							to='/register'
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							haven't an account?
						</Link>
					</Button>
				</Stack>
			</div>
		</AuthPageWrapper>
	);
};

export default Login;
