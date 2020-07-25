import React from 'react';

const FaceBoxes = ({topRow, bottomRow, leftCol, rightCol }) => {
	const myStyle = {
		top:topRow,
		bottom:bottomRow,
		left:leftCol,
		right:rightCol
	}
	return (
		<div className="facebox" 
		style = {myStyle}>
		</div>)	
}

export default FaceBoxes;