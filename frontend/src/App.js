import { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from 'components/shared/Navigation';
import PageSpinner from 'components/shared/PageSpinner';
import PrivateRoute from 'components/shared/PrivateRoute';

const Register = lazy(() => import('pages/register'));
const Login = lazy(() => import('pages/login'));
const Booking = lazy(() => import('pages/booking'));
const SearchResults = lazy(() => import('pages/hotels/SearchResults'));
const HotelDetails = lazy(() => import('pages/hotels/HotelDetails'));
const EditHotel = lazy(() => import('pages/hotels/EditHotel'));
const Dashboard = lazy(() => import('pages/user/Dashboard'));
const DashboardSeller = lazy(() => import('pages/user/DashboardSeller'));
const StripeCallback = lazy(() => import('pages/stripe/StripeCallback'));
const StripeSuccess = lazy(() => import('pages/stripe/StripeSuccess'));
const StripeCancel = lazy(() => import('pages/stripe/StripeCancel'));
const NotFound = lazy(() => import('pages/404'));

const App = () => {
	return (
		<Suspense fallback={<PageSpinner isOpen={true} />}>
			<Navigation />
			<Switch>
				<Route exact path='/' component={Booking} />
				<Route exact path='/search-result' component={SearchResults} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/hotel/:hotelId' component={HotelDetails} />
				<Route
					exact
					path='/hotel/edit/:hotelId'
					component={EditHotel}
				/>
				<PrivateRoute exact path='/user/dashboard'>
					<Dashboard />
				</PrivateRoute>
				<PrivateRoute exact path='/user/dashboard/seller'>
					<DashboardSeller />
				</PrivateRoute>
				<PrivateRoute exact path='/stripe/callback'>
					<StripeCallback />
				</PrivateRoute>
				<PrivateRoute exact path='/stripe/success/:hotelId'>
					<StripeSuccess />
				</PrivateRoute>
				<PrivateRoute exact path='/stripe/cancel'>
					<StripeCancel />
				</PrivateRoute>
				<Route component={NotFound} />
			</Switch>
		</Suspense>
	);
};

export default App;
