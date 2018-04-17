import React from 'react';
import faker from 'faker';

class RestaurantDetails extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      price: []
    }
	}


	render() {
    let priceRange = [];
    for (var i = 0; i < this.props.dummyData.price_level; i++) {
      priceRange.push('$');
    }

    let dollar = priceRange.map((dollar) => {
      return dollar;
    })

    var starsPercentage = (googleRating) => {
      var percent = googleRating / 5 * 100;
      console.log('Percent: ', percent + '%')
      return percent + '%';
    }

		return (
			<div className="restaurant-details">
				<div className="restaurant-details-name">{this.props.dummyData.name}</div>

        <div className="restaurant-details-info">
          <span>{this.props.dummyData.types[1]}</span><span> · </span><span>{this.props.dummyData.address_components[2].long_name}</span><span> · </span><span>{dollar}</span>
        </div>

        <div className="restaurant-details-ratings">
          <img className="apateez-logo-small" src="apateez-logo-small-red.jpeg" /> <span className="restaurant-details-ratings-zagat-rated">FOOD</span> <span className="restaurant-details-ratings-zagat-rated-value">{this.props.dummyData.reviews[0].rating}</span> 
          <span className="pipeline">|</span>
          <img className="google-logo-small" src="google-logo-icon.png" /><span className="restaurant-details-ratings-google-rating">{this.props.dummyData.rating}</span>
          <div className="restaurant-details-ratings-stars">
            <div className="restaurant-details-ratings-stars-top" style={{width: starsPercentage(this.props.dummyData.rating)}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            <div className="restaurant-details-ratings-stars-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
          </div>
          <span className="restaurant-details-ratings-comments">({Math.floor(Math.random()*500)})</span>
        </div>

        <div className="restaurant-details-description">
          {faker.lorem.sentence()}
        </div>        

			</div>
		)
	}
}

module.exports = RestaurantDetails;