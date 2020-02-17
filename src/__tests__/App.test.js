import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

describe('App Component', () => {
    describe('render', () => {
        it('should render correctly', () => {
            expect(shallow(<App />)).toMatchSnapshot();
        });
    });
});
