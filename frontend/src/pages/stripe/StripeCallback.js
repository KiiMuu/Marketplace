import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAccountStatus } from 'state/stripe/stripeApi';
import { updateUserInLS } from 'state/user/userApi';
import { CircularProgress } from '@mui/material';

const StripeCallback = ({ history }) => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector(state => state.user);

	const accountStatus = useCallback(async () => {
		try {
			let res = await dispatch(
				getAccountStatus({ token: userInfo?.token })
			).unwrap();

			updateUserInLS(res, () => {
				dispatch({
					type: 'user/login',
					payload: res,
				});
			});

			window.location.href = '/user/dashboard/seller';
		} catch (error) {
			console.error('ERROR', error);
		}
	}, [dispatch, userInfo?.token]);

	useEffect(() => {
		if (userInfo && userInfo.token) accountStatus();
	}, [userInfo, accountStatus]);

	return (
		<div style={{ textAlign: 'center', marginTop: '100px' }}>
			<CircularProgress size={28} thickness={3} />
		</div>
	);
};

export default StripeCallback;
