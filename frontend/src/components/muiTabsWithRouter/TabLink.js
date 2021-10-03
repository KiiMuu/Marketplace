import RouterLink from './RouterLink';
import { Tab } from '@mui/material';

const TabLink = ({ to, value, ...props }) => {
	return (
		<Tab component={RouterLink} to={to ?? value} value={value} {...props} />
	);
};

export default TabLink;
