var React = require('react');
var ReactRouter = require('react-router');
var HashHistory = require('react-router/lib/hashhistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Main = require('./components/Main')

module.exports = (
	<Router history = {new HashHistory}>
		<Route path = "/" component ={Main}>
			
		</Route> 
	</Router>
);