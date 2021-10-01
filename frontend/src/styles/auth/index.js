import { styled } from '@stitches/react';

export const AuthPageWrapper = styled('form', {
	height: '100vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	'& .authContent': {
		backgroundColor: '#fff',
		width: '400px',
		padding: '30px',
		borderRadius: 'var(--br)',
		boxShadow:
			'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
	},
});
