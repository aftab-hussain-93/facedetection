import React from 'react';
// import Tilt from 'react-tilt';
import Tilt from 'react-tilted'
import Brain from './brain.png';
import './Logo.css';

const Logo = () =>{
	return (
		<div className="ml4 mt0">
			<Tilt className="Tilt br-2 shadow-2" options={{ max : 60 }} style={{ height: 150, width: 150 }} >
 				<div className="Tilt-inner pa3 pt4"> <img alt="brain-logo" src={Brain}/> </div>
			</Tilt>
		</div>)
}

export default Logo;
