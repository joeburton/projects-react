import "raf/polyfill";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import mountWithStore from './mountWithStore';

// @todo mock up store?? or work from the real store 
// https://github.com/reactjs/redux/issues/2179 

import NumberProjects from '../js/ui/number-projects';

describe('#NumberProjects2', () => {

    let wrapper;
    let store;

    const action = {
        type: 'type',
        data: 'data'
    };

    const props = {
    };

    const testState = {
        'projectReducer': {
            'projects': [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
        }
    };

    beforeEach(() => {

        store = createMockStore(testState);
        wrapper = mountWithStore(<NumberProjects {...props} />, store);
    });

    it('should contain 11 projects', () => {

        expect(wrapper.find('span').hasClass('number-projects')).toBe(true);
        expect(wrapper.find('span').text()).toBe("11");
        expect(wrapper.find('.number-projects').type()).toEqual('span');
    });

    it('should test actions', () => {

        store.dispatch(action);

        expect(store.getAction(action.type)).toEqual(action);
        expect(store.getActions()).toEqual([action]);
        expect(store.isActionDispatched(action)).toBe(true);
        expect(store.isActionTypeDispatched(action.type)).toBe(true);
        expect(store.getState()).toBe(testState);
    });

});
