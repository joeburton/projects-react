import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Projects from '../js/ui/projects';

describe('#NumberProjects', () => {

    let wrapper;

    const props = {
        projects: [{
            company: "Tribal Worldwide",
            _id: "4234234",
            projects: [{
                description: "My Perfect Volkswagen is a SPA built in Backbone ",
                id: "5a6353c69e0483a99e2ffdf3",
                link: "https://perfect.volkswagen.co.uk",
                project: "Perfect Volkswagen 1",
                skills: "Backbone, Require, Jasmine, jQuery, HTML5, CSS3/SASS & Gulp"
            }, {
                description: "My Perfect Volkswagen is a SPA built in Backbone ",
                id: "5a6353c69e0483a99e2ffdf3",
                link: "https://perfect.volkswagen.co.uk",
                project: "Perfect Volkswagen 2",
                skills: "Backbone, Require, Jasmine, jQuery, HTML5, CSS3/SASS & Gulp"
            }]
        }, {
            company: "Tribal Worldwide",
            _id: "4234234",
            projects: [{
                description: "My Perfect Volkswagen is a SPA built in Backbone ",
                id: "5a6353c69e0483a99e2ffdf3",
                link: "https://perfect.volkswagen.co.uk",
                project: "Perfect Volkswagen 3",
                skills: "Backbone, Require, Jasmine, jQuery, HTML5, CSS3/SASS & Gulp"
            }, {
                description: "My Perfect Volkswagen is a SPA built in Backbone ",
                id: "5a6353c69e0483a99e2ffdf3",
                link: "https://perfect.volkswagen.co.uk",
                project: "Perfect Volkswagen 4",
                skills: "Backbone, Require, Jasmine, jQuery, HTML5, CSS3/SASS & Gulp"
            }]
        }],
        numberProjects: 4,
        loggedin: true
    };

    beforeEach(() => {
        wrapper = mount(
            <Projects {...props} />
        );
    });

    it('should contain 10 projects', () => {
        // console.log(wrapper.debug());
        console.log(wrapper.find('h3').text());
        expect(wrapper.find('h3').text()).toBe('Projects (4)');
    });

});