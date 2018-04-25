import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import RestaurantCard from '../RestaurantCard.jsx';

Enzyme.configure({ adapter: new Adapter() });

test('Restaurant Card shallow copy should be equal to Snapshot', () => {
    const wrapper = shallow(
        <RestaurantCard />
    );
    expect(wrapper).toMatchSnapshot();
});