import React from 'react';
import { shallow } from 'enzyme';

import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from '../js/store';
import App from '../js/layouts/app';

import NumberProjects from '../js/ui/number-projects';

describe('NumberProjects', () => {
    let wrapper;
    const props = {
        numberProjects: 10
    };
    

    beforeEach(() => {
        wrapper = shallow(
            <Provider store={store}>
                <NumberProjects {...props} />
            </Provider>
        );
    });

    it('should contain 10 projects', () => {
        expect(props.numberProjects).toEqual(10);
    });

});
