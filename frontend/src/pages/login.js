import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from 'state/user/userApi';
import { AuthPageWrapper } from 'styles/auth';
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	FormHelperText,
	OutlinedInput,
	Stack,
	TextField,
	Typography,
	Box,
	useMediaQuery,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const { status: loginStatus, errors } = useSelector(state => state.user);
	const sm = useMediaQuery(theme => theme.breakpoints.down('sm'));

	const handleClickShowPassword = () => {
		setShowPassword(prev => !prev);
	};

	const handleMouseDownPassword = e => {
		e.preventDefault();
	};

	const handleLogin = async e => {
		e.preventDefault();

		try {
			const user = await dispatch(
				loginUser({ email, password })
			).unwrap();

			setEmail('');
			setPassword('');
			window.localStorage.setItem('marketUser', JSON.stringify(user));
			history.push('/user/dashboard');
		} catch (err) {
			console.log('error', err);
		}
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
				<Box sx={{ marginTop: '20px' }}>
					{errors.map((error, i) =>
						!error.param ? (
							<FormHelperText error key={i}>
								{error.msg}
							</FormHelperText>
						) : null
					)}
				</Box>
				<FormControl sx={{ mt: 2 }} fullWidth>
					<TextField
						error={
							errors.find(e => e.param === 'email') ? true : false
						}
						helperText={errors.map(e =>
							e.param === 'email' ? e.msg : null
						)}
						color='secondary'
						label='Email'
						variant='outlined'
						placeholder='Type your email'
						size='small'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</FormControl>
				<FormControl sx={{ mt: 2 }} size='small' fullWidth>
					<InputLabel htmlFor='password' color='secondary'>
						Password
					</InputLabel>

					<OutlinedInput
						error={
							errors.find(e => e.param === 'password')
								? true
								: false
						}
						color='secondary'
						id='password'
						label='Password'
						placeholder='Type your password'
						type={showPassword ? 'text' : 'password'}
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
					<FormHelperText
						error={
							errors.find(e => e.param === 'password')
								? true
								: false
						}
					>
						{errors.map(e =>
							e.param === 'password' ? e.msg : null
						)}
					</FormHelperText>
				</FormControl>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					marginTop='20px'
					spacing={2}
				>
					<LoadingButton
						loading={loginStatus === 'loading'}
						variant='contained'
						disableElevation
						size={sm ? 'small' : 'large'}
						type='submit'
					>
						Login
					</LoadingButton>
					<Link
						to='/register'
						style={{
							textDecoration: 'none',
							color: 'var(--mainColor)',
						}}
					>
						haven't an account?
					</Link>
				</Stack>
			</div>
		</AuthPageWrapper>
	);
};

export default Login;
