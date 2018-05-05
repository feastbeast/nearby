import React from 'react';
import PhotoCarousel from './PhotoCarousel';
import RestaurantDetail from './RestaurantDetails';

class RestaurantCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="restaurant-container" >
				<PhotoCarousel nearbyRestaurant={this.props.nearbyRestaurant} />
				<RestaurantDetail nearbyRestaurant={this.props.nearbyRestaurant} switchRestaurant={this.props.switchRestaurant} />
			</div>
		)
	}
}

module.exports = RestaurantCard;