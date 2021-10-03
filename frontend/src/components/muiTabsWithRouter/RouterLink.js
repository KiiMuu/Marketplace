import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const RouterLink = (props, ref) => <Link ref={ref} {...props} />;

export default forwardRef(RouterLink);
