import { useRouteMatch } from 'react-router-dom';

const useMUITabsWithRouter = (routes, defaultRoute) => {
	const match = useRouteMatch(routes);

	return match?.path ?? defaultRoute;
};

export default useMUITabsWithRouter;
