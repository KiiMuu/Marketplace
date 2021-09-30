import { globalCss } from '@stitches/react';

const globalStyles = globalCss({
	':root': {
		'--mainColor': '#0EA5E9',
		'--secondaryColor': '#252A34',
		'--br': '3px', // border-radius
		'--borderColor': '#f0ebeb',
		'--textGray': 'rgb(91, 112, 131)',
	},
	html: {
		fontSize: '62.5%',
	},
	body: {
		boxSizing: 'border-box',
		fontFamily: ['Poppins', 'sans-serif'].join(','),
		scrollBehavior: 'smooth',
		fontSize: '1.6rem',
		padding: '0',
		margin: '0',
		height: '2000px',
	},
	'*, *::before, *::after': {
		boxSizing: 'inherit',
		padding: '0',
		margin: '0',
	},
});

export default globalStyles;
