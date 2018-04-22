import React from 'react';
import ReactDOM from 'react-dom';
import RestaurantCard from './components/RestaurantCard.jsx';
import '../dist/styles.css';
// import dummyData from '../../../grabData/fullList.json';
import Footer from './components/Footer.jsx';
import $ from 'jquery';

class App extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      hardcodeSix: [1,2,3,4,5,6],
      currentRestaurant: [],
      nearbyRestaurant: [],
      dummyPhoto: ['dummy-image.png', 'example-photo-02.jpeg', 'example-photo-03.jpeg', 'example-photo-04.jpeg', 'example-photo-05.jpeg', 'example-photo-06.jpeg']
    }
	}

  componentDidMount() {
    console.log('window location.href: ', window.location.href);

    var id = window.location.href.split('/')[4];
    console.log('getting recommended restaurants for id: ' + id)

    $.ajax({
      url: `/api/restaurants/${id}/nearby`,
      method: "GET",
      success: (data) => {
        console.log('GET Data: ', data)
        this.setState({
          currentRestaurant: data[0],
          nearbyRestaurants: data[1]
        })
      },
      error: (err) => {
        console.log('GET Error: ', err)
      }
    })

    
  }

  _goToRestaurant(id) {
    console.log('go to restaurant ' + id)
    location.href = '/restaurants/' + id;
  }

	render() {
    
    let restaurantCards = this.state.nearbyRestaurants.map((num, index) => {
      return (
        <RestaurantCard nearbyRestaurants={this.state.nearbyRestaurants[index]} dummyPhoto={this.state.dummyPhoto[index]} key={index.toString()} switchRestaurant={this.goToRestaurant.bind(this)} />
      )
    })
		return (
			<div>
				<div className="restaurant-header">Restaurants Near {currentRestaurant.name}</div>
        <div className="restaurant-cards">
				{restaurantCards}
        </div>
        <Footer />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('nearby-app'));