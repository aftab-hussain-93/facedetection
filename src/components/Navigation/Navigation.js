import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn){
	return (<nav style={{display: "flex", justifyContent:"flex-end"}}>
			<p onClick={ () => onRouteChange('signin') } className="f3 link dim pointer white pa3 pt0">Sign Out</p>
		</nav>);
	} else {
		return	(
			<nav style={{display: "flex", justifyContent:"flex-end"}}>
				<p 
				onClick={ () => onRouteChange('signin') } 
				className="f3 link dim pointer white pa3 pt0">Login</p>
				<p 
				onClick={ () => onRouteChange('register') } 
				className="f3 link dim pointer white pa3 pt0">Register</p>
			</nav>);
	}
}

export default Navigation;

