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
  });
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
  test('Sign in button', async () => {
    const changeDefaultSignInUpViewFn = jest.fn();
    render(<SignInUpModal i18n={i18next} show={true} changeDefaultSignInUpView={changeDefaultSignInUpViewFn}/>);
    var sign_in_button = screen.getByTestId('sign_in_btn_test_id');
    var sign_up_question_button = screen.getByTestId('sign_up_question_btn_test_id');
    var email_or_username_input = screen.getByTestId('email_or_username_test_id');
    var password_input = screen.getByTestId('password_test_id');
    var oauth_buttons = screen.getAllByTestId('google_oauth_button_test_id');
    expect(oauth_buttons.length).toBe(1);
    fireEvent.click(sign_in_button);
    var fields_errors = screen.getAllByTestId('field_error_test_id');
    expect(fields_errors.length).toBe(2);
    fireEvent.click(sign_up_question_button);
    expect(changeDefaultSignInUpViewFn).toHaveBeenCalledTimes(1);
    fireEvent.input(email_or_username_input, {target: {value: "xxx"}});
    fireEvent.click(sign_in_button);
    var fields_errors = screen.getAllByTestId('field_error_test_id');
    expect(fields_errors.length).toBe(1);
    fireEvent.input(email_or_username_input, {target: {value: ""}});
    fireEvent.input(password_input, {target: {value: "xxx"}});
    fireEvent.click(sign_in_button);
    var fields_errors = screen.getAllByTestId('field_error_test_id');
    expect(fields_errors.length).toBe(1);
    fireEvent.input(password_input, {target: {value: ""}});
    fireEvent.click(sign_in_button);
    var fields_errors = screen.getAllByTestId('field_error_test_id');
    expect(fields_errors.length).toBe(2);
  });
  
  test('Sign up button', async () => {
    const changeDefaultSignInUpViewFn = jest.fn();
    render(<SignInUpModal i18n={i18next} show={true} default_sign_in_up_view="sign_up" changeDefaultSignInUpView={changeDefaultSignInUpViewFn}/>);
    var sign_up_button = screen.getByTestId('sign_up_btn_test_id');
    var sign_in_question_button = screen.getByTestId('sign_in_question_btn_test_id');
    var first_name_input = screen.getByTestId('first_name_test_id');
    var last_name_input = screen.getByTestId('last_name_test_id');
    var email_input = screen.getByTestId('email_test_id');
    var username_input = screen.getByTestId('username_test_id');
    var password_input = screen.getByTestId('password_test_id');
    var password_confirmation_input = screen.getByTestId('password_confirmation_test_id');
    var oauth_buttons = screen.getAllByTestId('google_oauth_button_test_id');
    expect(oauth_buttons.length).toBe(1);
    fireEvent.click(sign_up_button);
    var fields_errors = screen.getAllByTestId('field_error_test_id');
    expect(fields_errors.length).toBe(5);
    fireEvent.click(sign_in_question_button);
    expect(changeDefaultSignInUpViewFn).toHaveBeenCalledTimes(1);
    fireEvent.input(first_name_input, {target: {value: "xxx"}});
    fireEvent.input(last_name_input, {target: {value: "xxx"}});
    fireEvent.input(email_input, {target: {value: "email@email.com"}});
    fireEvent.input(username_input, {target: {value: "exists"}});
    fireEvent.input(password_input, {target: {value: "xxx"}});
    fireEvent.click(sign_up_button);
    var fields_errors = screen.getAllByTestId('field_error_test_id');
    expect(fields_errors.length).toBe(1);
    fireEvent.input(password_confirmation_input, {target: {value: "xxx2"}});
    fireEvent.click(sign_up_button);
    var fields_errors = screen.getAllByTestId('field_error_test_id');
    expect(fields_errors.length).toBe(1);
    fireEvent.input(password_confirmation_input, {target: {value: "xxx"}});
    fireEvent.input(email_input, {target: {value: ""}});
    fireEvent.click(sign_up_button);
    var fields_errors = screen.getAllByTestId('field_error_test_id');
    expect(fields_errors.length).toBe(1);
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
