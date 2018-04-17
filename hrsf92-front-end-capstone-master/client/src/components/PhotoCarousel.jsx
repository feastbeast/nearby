import React from 'react';

class PhotoCarousel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="restaurant-photocarousel">
				<img className="restaurant-photocarousel-image" src={this.props.dummyPhoto}/>
			</div>
		)
	}
}

module.exports = PhotoCarousel;