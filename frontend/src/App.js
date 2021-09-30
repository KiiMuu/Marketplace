import { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from 'components/shared/Navigation';
import PageSpinner from 'components/shared/PageSpinner';

const Register = lazy(() => import('pages/register'));
const Login = lazy(() => import('pages/login'));
const Booking = lazy(() => import('pages/booking'));
const NotFound = lazy(() => import('pages/404'));

const App = () => {
	return (
		<Suspense fallback={<PageSpinner isOpen={true} />}>
			<Navigation />
			<Switch>
				<Route exact path='/' component={Booking} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<Route component={NotFound} />
			</Switch>
		</Suspense>
	);
};

export default App;
