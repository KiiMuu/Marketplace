import { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from 'components/shared/Navigation';
import PageSpinner from 'components/shared/PageSpinner';
import PrivateRoute from 'components/shared/PrivateRoute';

const Register = lazy(() => import('pages/register'));
const Login = lazy(() => import('pages/login'));
const Booking = lazy(() => import('pages/booking'));
const Dashboard = lazy(() => import('pages/user/Dashboard'));
const DashboardSeller = lazy(() => import('pages/user/DashboardSeller'));
const NotFound = lazy(() => import('pages/404'));

const App = () => {
	return (
		<Suspense fallback={<PageSpinner isOpen={true} />}>
			<Navigation />
			<Switch>
				<Route exact path='/' component={Booking} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<PrivateRoute exact path='/user/dashboard'>
					<Dashboard />
				</PrivateRoute>
				<PrivateRoute exact path='/user/dashboard/seller'>
					<DashboardSeller />
				</PrivateRoute>
				<Route component={NotFound} />
			</Switch>
		</Suspense>
	);
};

export default App;
