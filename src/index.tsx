import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import Home from 'pages/Home';


let NODE_ENV = process.env.NODE_ENV;

// disable dev tools in production
if (NODE_ENV === 'production') {
	disableReactDevTools();
};

const App = () => {

	return (

		<Switch>

			<Route path='/' component={Home} exact />
			
			<Redirect from='*' to='/' />

		</Switch>
			
	); 

};

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);
