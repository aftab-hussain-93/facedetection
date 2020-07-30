import React from 'react';
// import './ImageLinkForm.css';

const Rank = ({name, entries})=> {
	return (
		<div>
			<div className="f3 fw6">
				{`${name} your image count is.....`}
			</div>
			<div className="f2">
				{entries}
			</div>
		</div>)
}

export default Rank;