import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonClick})=> {
	return (
		<div>
			<p className="f3">
			{'Hello let me detect your faces!'}
			</p>
			<div className="center">
				<div className="customForm center pa4 br3 shadow-5">
					<input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
					<button className="w-30 grow f4 link ph3 pv2 white bg-light-purple" onClick={onButtonClick}>Detect!</button>
				</div>
			</div>
		</div>)
}

export default ImageLinkForm;
