import { mount } from 'enzyme';

const mountWithStore = (component, store) => {
    const context = {
        store,
    };
    return mount(component, { context });
};

export default mountWithStore;