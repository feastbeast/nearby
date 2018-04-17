import React from 'react';
import PhotoCarousel from './PhotoCarousel.jsx';
import RestaurantDetail from './RestaurantDetails.jsx';

class RestaurantCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="restaurant-container" >
				<PhotoCarousel dummyData={this.props.dummyData} dummyPhoto={this.props.dummyPhoto}/>
				<RestaurantDetail dummyData={this.props.dummyData} />
			</div>
		)
	}
}

module.exports = RestaurantCard;