import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom"
import Home from "@pages/home"
import Login from "@pages/auth/login"
import Signin from "@pages/auth/signin"
import FourZeroFour from "@pages/errors/FourZeroFour"

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/auth/login" exact component={Login} />
				<Route path="/auth/signin" exact component={Signin} />
				<Route component={FourZeroFour} />
			</Switch>
		</Router>
	)
}

export default App
