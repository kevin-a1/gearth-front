import React, { useState } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Login } from '../pages/Login';
import Register from '../pages/Register';
import { Error } from '../pages/Error';
import { NotFound } from '../pages/NotFound';
import { Access } from '../pages/Access';
import { Provider } from 'react-redux';
import App from './../../App';
import store from '../../redux/store';

//<Provider store={store}>

const AppWrapper = (props) => {

	const [ colorScheme, setColorScheme ] = useState('dark')

	return (
		<Provider store={store}>
			<Switch>
					<Route path="/login" render={() => <Login colorScheme={ colorScheme } /> } />
					<Route path="/register" render={() => <Register /> } />
					<Route path="/error" render={() => <Error colorScheme={ colorScheme } />} />
					<Route path="/notfound" render={() => <NotFound colorScheme={ colorScheme } />} />
					<Route path="/access" render={() => <Access colorScheme={ colorScheme } />} />
					<App setColorScheme={ setColorScheme } />;
			</Switch>
		</Provider>
		
	);
}

export default withRouter(AppWrapper);