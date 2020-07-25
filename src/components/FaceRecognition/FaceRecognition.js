import React from 'react';
import './FaceRecognition.css';
import FaceBoxes from '../FaceBoxes/FaceBoxes';

const FaceRecognition = ({imageUrl, box})=> {
	let id = 0;
	let divElems = '';
	if(typeof box!== 'undefined' && box.length>0){
 		divElems = box.map(({leftCol, topRow, rightCol, bottomRow}) => {
			id++;
			return <FaceBoxes key={id} topRow={topRow} leftCol={leftCol} rightCol={rightCol} bottomRow={bottomRow}/>
		});
	}
	
	return (
		<div className="center ma">
			<div className="absolute mt2">
				<img id="faceimage" src={imageUrl} width="500px" height="auto" alt="" />
				{divElems}
			</div>
		</div>)
}

export default FaceRecognition;
