import "raf/polyfill";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from '../js/store'; 

// @todo mock up store?? or work from the real store 
// https://github.com/reactjs/redux/issues/2179
import { getProjects } from '../js/actions/actions';

import NumberProjects from '../js/ui/number-projects';

describe('#NumberProjects', () => {

    let wrapper;

    const props = {
    };

    beforeEach(() => {
        
        // store.subscribe(() =>
        //     console.log('Store updated: ', store.getState())
        // );

        store.dispatch(getProjects([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]));
        
        wrapper = mount(
            <Provider store={store}>
                <NumberProjects {...props} />
            </Provider>
        );
    });

    it('should contain 10 projects', () => {
        expect(wrapper.find('span').hasClass('number-projects')).toBe(true);
        expect(wrapper.find('span').text()).toBe("10"); 
        expect(wrapper.find('.number-projects').type()).toEqual('span');
    });

});
