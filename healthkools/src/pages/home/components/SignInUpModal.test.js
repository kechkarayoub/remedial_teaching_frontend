import React, { Component } from "react";
import { render, screen, act, fireEvent } from '@testing-library/react';
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
  city: "Casablanca",
  country_code: "MA",
  country_name: "Morocco",
  latitude: 33.5928,
  longitude: -7.6192,
  postal: null,
  state: "Casablanca-Settat",
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

  test('Should close button calls onHide', async () => {
    const closeFn = jest.fn();
    await act(async () => {
      const { container } = render(<SignInUpModal i18n={i18next} show={true} onHide={closeFn}/>);
      var close_btn_sium = screen.getByTestId('close_btn_sium');
      fireEvent.click(close_btn_sium, {target: {}});
      expect(closeFn).toHaveBeenCalledTimes(1);
    });
  });

  test('Should contains geo info data', async () => {
    await act(async () => {
      const wrapper = mount(<SignInUpModal i18n={i18next} show={true} default_sign_in_up_view="sign_up" />);
    });

    await act(async () => {
      var country_custom_select = screen.getByTestId('country_custom_select');
      const input = country_custom_select.querySelector("input[name='country']");
      expect(input.value).toBe('MA');
    });
  });
});
