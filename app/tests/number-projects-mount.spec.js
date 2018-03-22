import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
// import mountWithStore from './mountWithStore';

// @todo mock up store?? or work from the real store https://github.com/reactjs/redux/issues/2179 

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
        // wrapper = mountWithStore(<NumberProjects {...props} />, store);
        wrapper = mount(<NumberProjects store={store} /> )  
    });

    it('should contain 11 projects', () => {

        expect(wrapper.find('span').hasClass('number-projects')).toBe(true);
        expect(wrapper.find('span').text()).toBe("11");
        expect(wrapper.find('.number-projects').type()).toEqual('span');
    });

    it('should test actions', () => {

        // debugger;

        // console.log(wrapper.debug());
        // console.log(wrapper.getDOMNode());
        // console.log(wrapper.instance());

        store.dispatch(action);

        expect(store.getAction(action.type)).toEqual(action);
        expect(store.getActions()).toEqual([action]);
        expect(store.isActionDispatched(action)).toBe(true);
        expect(store.isActionTypeDispatched(action.type)).toBe(true);
        expect(store.getState()).toBe(testState);
    });

    it('should be an instance on NumberProjects', () => {

        // expect(wrapper.find(NumberProjects)).toEqual(NumberProjects);
        // expect(wrapper.type()).toEqual('span');
        expect(wrapper.type()).toEqual(NumberProjects);

        wrapper.find('span').instance().innerHTML = 'new project details';

        expect(wrapper.find('span').text()).toBe("new project details");

        console.log(wrapper.find('span').text());
        
    });

});
