import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import GAListener from 'components/GAListener';
import {setCurrentUser,logoutUser} from "./actions/authAction"

import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';

import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';

import Login from './components/auth/Login';
import componentQueries from 'react-component-queries';
import './styles/reduction.scss';
const Landing =React.lazy(()=>import('./components/Layout/Landing'))
const AlertPage = React.lazy(() => import('pages/AlertPage'));
const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
const BadgePage = React.lazy(() => import('pages/BadgePage'));
const ButtonGroupPage = React.lazy(() => import('pages/ButtonGroupPage'));
const ButtonPage = React.lazy(() => import('pages/ButtonPage'));
const CardPage = React.lazy(() => import('pages/CardPage'));
const ChartPage = React.lazy(() => import('pages/ChartPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const DropdownPage = React.lazy(() => import('pages/DropdownPage'));
const FormPage = React.lazy(() => import('pages/FormPage'));
const InputGroupPage = React.lazy(() => import('pages/InputGroupPage'));
const ModalPage = React.lazy(() => import('pages/ModalPage'));
const ProgressPage = React.lazy(() => import('pages/ProgressPage'));
const TablePage = React.lazy(() => import('pages/TablePage'));
const TypographyPage = React.lazy(() => import('pages/TypographyPage'));
const WidgetPage = React.lazy(() => import('pages/WidgetPage'));
const ProductionDelivery = React.lazy(() => import('./pages/ProductionDelivery'));
const SalesvsCollection = React.lazy(() => import('./pages/SalesvsCollection'));
const PurchasevsInvoice = React.lazy(() => import('./pages/PurchasevsInvoice'));
const Attendance = React.lazy(() => import('./pages/Attendance'));
const BudgetAchievement = React.lazy(() => import('./pages/BudgetAchievement'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

// check for token 
if (localStorage.jwtToken) {
  // set auth token header auth 
  setAuthToken(localStorage.jwtToken)
  // decode token and get user info and exp 

  const decoded =jwt_decode(localStorage.jwtToken)
  // set user and isauthenticated
  store.dispatch(setCurrentUser(decoded)); 

  // check for expired token 
  const currentTime=Date.now()/1000;
  if (decoded.exp< currentTime) {
    //logOut user
    store.dispatch(logoutUser())
    // clear current profile
    //redirect to login 
    window.location.href='/login';
  }
}

class App extends React.Component {
  render() {
    return (
    <Provider store={store}>

      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={Landing} />
                <Route exact path="/dashboard" component={DashboardPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/login-modal" component={AuthModalPage} />
                <Route exact path="/buttons" component={ButtonPage} />
                <Route exact path="/cards" component={CardPage} />
                <Route exact path="/widgets" component={WidgetPage} />
                <Route exact path="/typography" component={TypographyPage} />
                <Route exact path="/alerts" component={AlertPage} />
                <Route exact path="/tables" component={TablePage} />
                <Route exact path="/badges" component={BadgePage} />
                <Route exact path="/button-groups" component={ButtonGroupPage} />
                <Route exact path="/dropdowns" component={DropdownPage} />
                <Route exact path="/progress" component={ProgressPage} />
                <Route exact path="/modals" component={ModalPage} />
                <Route exact path="/forms" component={FormPage} />
                <Route exact path="/input-groups" component={InputGroupPage} />
                <Route exact path="/charts" component={ChartPage} />
                <Route exact path="/productiondelivery" component={ProductionDelivery} />
                <Route exact path="/salesvscollection" component={SalesvsCollection} />
                <Route exact path="/purchasevsinvoice" component={PurchasevsInvoice} />
                <Route exact path="/attendance" component={Attendance} />
                <Route exact path="/budgetachievement" component={BudgetAchievement} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    </Provider>

    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
