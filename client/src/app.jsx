import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RestaurantCard from './components/RestaurantCard';
import Footer from './components/Footer';
import '../dist/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRestaurant: {},
      nearbyRestaurants: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const id = window.location.href.split('/')[4];
    // error handling if id is included in URL
    if (window.location.href.split('/')[4] !== undefined) {
      axios.get(`/api/restaurants/${id}/nearby`)
        .then(({ data }) => {
          // console.log(data);
          this.setState({
            currentRestaurant: data[0],
            nearbyRestaurants: data[1],
          });
        })
        .catch((err) => {
          console.log('GET Error: ', err);
        });
    } else {
      this.setState({
        checkID: false,
      });
    }
  }

  goToRestaurant(id) {
    console.log(`go to restaurant ${id}`);
    location.href = `/restaurants/${id}`;
  }

  render() {
    const switchRestaurant = this.goToRestaurant.bind(this);
    const restaurantCards = this.state.nearbyRestaurants.map((num, index) => (
      <RestaurantCard
        nearbyRestaurant={this.state.nearbyRestaurants[index]}
        key={index.toString()}
        switchRestaurant={switchRestaurant}
      />
    ));


    return (
      <div className="nearby-padding">
        <div className="restaurant-header">Restaurants Near {this.state.currentRestaurant.name ? this.state.currentRestaurant.name : 'none'}</div>
        <div className="restaurant-cards">
          {restaurantCards}
        </div>
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('nearby-app'));
