import React from 'react';
import { Carousel } from 'react-bootstrap';

class PhotoCarousel extends React.Component {
	constructor(props) {
		super(props);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null
    };
	}

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }


	render() {
    const { index, direction } = this.state;

		return (
			<div className="restaurant-photocarousel">
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
        >
          <Carousel.Item>
            <img alt="900x900" src={this.props.dummyPhoto} />
          </Carousel.Item>

          <Carousel.Item>
            <img alt="900x900" src={this.props.dummyPhoto} />
          </Carousel.Item>

          <Carousel.Item>
            <img alt="900x900" src={this.props.dummyPhoto} />
          </Carousel.Item>
        </Carousel>
			</div>
		)
	}
}

module.exports = PhotoCarousel;