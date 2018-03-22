import React from 'react';
import { shallow, render } from 'enzyme';

import Button from '../js/component';

describe('Button', () => {
    let wrapper;
    const props = {
        onClick: jasmine.createSpy('onClick'),
        label: 'SAVE'
    };

    beforeEach(() => {
        wrapper = shallow(<Button {...props} />);
    });

    it('should contain a `button` element', () => {
        expect(wrapper.is('button')).toBe(true);
    });

    it('should contain the label passed to it', () => {
        expect(wrapper.text()).toBe(props.label);
    });

    it('should call the `onClick` handler when the button is clicked', () => {
        wrapper.simulate('click');

        expect(props.onClick).toHaveBeenCalled();
    });
});
