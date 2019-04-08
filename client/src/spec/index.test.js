import React from 'react';
import {shallow, mount} from 'enzyme';
import App from '../components/app';

describe('Renders component', function() {

    test('Renders', function() {

        const wrapper = shallow(<App />);
        
        expect(wrapper.exists()).toBe(true);
    });
});

describe('Has title that contains Reviews', function() {
    var wrapper; 

    test('Title', function() {
        wrapper = mount(<App />);
        expect(wrapper.find('#summary_reviews_container').text()).toContain('Reviews');
    });
});

describe('Finds the number of specific button on the page', function() {
    test('Finds', function() {
        const wrapper = shallow(<App />);

        expect(wrapper.find('#forward_button').length).toBe(1);
        expect(wrapper.find('#one_page_button').length).toBe(0);
    });
});

describe('Tests that less than 7 reviews render on the page at a time', function() {
    test('Tests', function() {
        const wrapper = shallow(<App />);

        expect(wrapper.find('#review_list').length).toBeLessThan(7);
    });
});   

describe('Searches footer', function() {
    var wrapper;
    var search;

    beforeEach(() => {
        wrapper = mount(<App />);
        search = wrapper.find('#footer_container');
    });

    test('Starts out hidden', function() {
        expect(search.hasClass('isHiddenFooter')).toBeFalsy();
    });
});
    
describe('', function() {
    const wrapper = shallow(<App />);
    var search = wrapper.state('activePage');

    expect(search).toEqual(1);
   
    test('', function() {
        wrapper.find('#forward_button').props().onClick();
        wrapper.update();
    
        expect(search).toEqual(1); 
    });
});
        