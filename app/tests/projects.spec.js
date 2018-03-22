import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Projects from '../js/ui/projects';
import Project from '../js/ui/project';

describe('#Projects', () => {

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

    it('should contain 4 projects', () => {
        // console.log(wrapper.debug());
        // console.log(wrapper.find('h3').text());
        // console.log(wrapper.find(Project).at(0).find('li'));
        // console.log(wrapper.find(Project).at(0))
        // console.log(wrapper.find(Project).at(0).find('li').debug());

        expect(wrapper.find(Project).at(0).find('li').hasClass('project')).toBeTruthy();
        expect(wrapper.find('h3').text()).toBe('Projects (4)');
    });

    it('should contain the correct company title', () => {
        expect(wrapper.find('.company-name').at(0).text()).toEqual('Company: Tribal Worldwide')
    });

    it('should contain the correct skills list', () => {
        expect(wrapper.find('.skills').at(0).text()).toEqual(' Backbone, Require, Jasmine, jQuery, HTML5, CSS3/SASS & Gulp ')
    });

    it('should pass', () => {
        // console.log(wrapper.debug());
        // console.log(wrapper.getDOMNode());
        // console.log(wrapper.instance());
    })

});