import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Movies from './Movies';
import Movie from './Movie/Movie';

Enzyme.configure({ adapter: new Adapter() });

describe('<Movies />', () => {
    it('should render 3 <Movie /> components', () => {
        const wrapper = shallow(<Movies movies={[{ id: 1 }, { id: 2 }, { id: 3 }]} />);

        const movies = wrapper.find(Movie);

        expect(movies).toHaveLength(3);
    });
});
