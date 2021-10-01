import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from 'state/user/userApi';
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

const Register = ({ history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const disptach = useDispatch();
	const { status: registerStatus, errors } = useSelector(state => state.user);
	const sm = useMediaQuery(theme => theme.breakpoints.down('sm'));

	const handleClickShowPassword = () => {
		setShowPassword(prev => !prev);
	};

	const handleMouseDownPassword = e => {
		e.preventDefault();
	};

	const handleRegister = e => {
		e.preventDefault();

		disptach(registerUser({ name, email, password }));
	};

	useEffect(() => {
		if (registerStatus === 'succeeded') {
			setName('');
			setEmail('');
			setPassword('');
			history.push('/');
		}
	}, [registerStatus, history]);

	return (
		<AuthPageWrapper onSubmit={handleRegister}>
			<div className='authContent'>
				<Typography variant='h4' gutterBottom>
					Register
				</Typography>
				<Typography variant='subtitle2' color='secondary'>
					Create a new account.
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
							errors.find(e => e.param === 'name') ? true : false
						}
						helperText={errors.map(e =>
							e.param === 'name' ? e.msg : null
						)}
						color='secondary'
						label='Name'
						variant='outlined'
						placeholder='Type your name'
						size='small'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</FormControl>
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
						loading={registerStatus === 'loading'}
						variant='contained'
						disableElevation
						size={sm ? 'small' : 'large'}
						type='submit'
					>
						Register
					</LoadingButton>
					<Link
						to='/login'
						style={{
							textDecoration: 'none',
							color: 'var(--mainColor)',
						}}
					>
						have an account?
					</Link>
				</Stack>
			</div>
		</AuthPageWrapper>
	);
};

export default Register;
