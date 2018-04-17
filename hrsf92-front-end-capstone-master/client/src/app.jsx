import React from 'react';
import ReactDOM from 'react-dom';
import RestaurantCard from './components/RestaurantCard.jsx';
import '../dist/styles.css';
import dummyData from '../../../grabData/fullList.json';
import Footer from './components/Footer.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      hardcodeSix: [1,2,3,4,5,6],
      dummyData: [],
      dummyPhoto: ['dummy-image.png', 'example-photo-02.jpeg', 'example-photo-03.jpeg', 'example-photo-04.jpeg', 'example-photo-05.jpeg', 'example-photo-06.jpeg']
    }
	}

  componentWillMount() {
    let exampleData = [];
    for (var i = 0; i < 6; i++) {
      exampleData.push(dummyData[Math.floor(Math.random()*dummyData.length)]);
    }

    this.setState({
      dummyData: exampleData
    })
  }

	render() {
    
    let restaurantCards = this.state.dummyData.map((num, index) => {
      return (
        <RestaurantCard dummyData={this.state.dummyData[index]} dummyPhoto={this.state.dummyPhoto[index]} key={num.toString()} />
      )
    })
		return (
			<div>
				<div className="restaurant-header">Restaurants Near {dummyData[Math.floor(Math.random()*dummyData.length)].name}</div>
        <div className="restaurant-cards">
				{restaurantCards}
        </div>
        <Footer />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('nearby-app'));