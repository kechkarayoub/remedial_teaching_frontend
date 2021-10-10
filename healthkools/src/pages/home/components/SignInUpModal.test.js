import React, { Component } from "react";
import { render, screen, act } from '@testing-library/react';
import SignInUpModal from "./SignInUpModal";
import { withRouter, Redirect } from "react-router-dom";
import axios from 'axios';
import i18next from '../../../init_fcm';
import moment from 'moment';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure, shallow } from 'enzyme'
import { unmountComponentAtNode } from "react-dom";
import { async } from "q";
configure({adapter: new Adapter()});

jest.mock('react-i18next', () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
    return Component;
  },
}));
jest.mock('axios');
export const geo_info_data =  {
  IPv4: "xx.x.xx.x",
  city: "TEST_CITY",
  country_code: "TEST_CODE",
  country_name: "TEST_COUNTRY",
  latitude: 0,
  longitude: -0,
  postal: null,
  state: "TEST_STATE",
};
describe('SignInUpModal component', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
    //window.fetch = jest.fn(); if running browser environment
  });
  // let wrapper;
  // beforeEach(() => {
  //   wrapper = shallow(<SignInUpModal i18n={i18next} show={true} />, { disableLifecycleMethods: true });
  // });
  // afterEach(() => {
  //   wrapper.unmount();
  // });
  test('Should render without crash', async () => {
    render(<SignInUpModal i18n={i18next} show={true} />);
  });
  // test('Should render without crash', () => {  
  //   mount(<SignInUpModal i18n={i18next} show={true}/>);  
  //  });
  test('Should contains geo info data', async () => {
    // let wrapper = mount(<SignInUpModal i18n={i18next} show={true}/>);
    // wrapper.instance().componentDidMount();
    // expect(wrapper.find('.modal-body').length).toEqual(1);
    // expect(wrapper.find('.field_input').hostNodes().length).toEqual(1);

    // expect(wrapper.find('.field_input').children()).toHaveLength(4); 
    // console.log(wrapper.find('.field_input').first().html())
    // console.log(wrapper.find('.field_input').last().html())
    // console.log(wrapper.last().html())
    await act(async () => {
      const { container } = render(<SignInUpModal i18n={i18next} show={true}/>);
      expect(screen.getAllByTestId('body').length).toBe(1);
      // console.log(screen.getAllByTestId('body')[0].innerHTML)
    });
  });
});
