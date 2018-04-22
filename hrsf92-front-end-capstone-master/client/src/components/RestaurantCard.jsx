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
				<PhotoCarousel nearbyRestaurants={this.props.nearbyRestaurants} dummyPhoto={this.props.dummyPhoto}/>
				<RestaurantDetail nearbyRestaurants={this.props.nearbyRestaurants} />
			</div>
		)
	}
}

module.exports = RestaurantCard;