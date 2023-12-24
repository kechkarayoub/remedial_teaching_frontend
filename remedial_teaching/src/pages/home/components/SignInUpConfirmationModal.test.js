import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import i18next from 'init_fcm';
import React from "react";
import SignInUpConfirmationModal from "pages/home/components/SignInUpConfirmationModal";
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { configure } from 'enzyme';

configure({adapter: new Adapter()});

jest.mock('react-i18next', () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
    return Component;
  },
}));

jest.mock('axios');

describe('SignInUpConfirmationModal component', () => {
  var registration_messages = {
    title: "Your account is created.",
    p1: "An activation email is sent to the address test@example.com for you to activate your email so that you can log in.",
    p2: "If you haven't received the email, click here to resend it.",
    username: "username",
  };
  beforeAll(() => {
    global.fetch = jest.fn();
  });
  test('Should render without crash', async () => {
    render(<SignInUpConfirmationModal i18n={i18next} show={true} registration_messages={registration_messages} />);
  });
  test('Should contains props data', async () => {
    await act(async () => {
      const { container } = render(<SignInUpConfirmationModal i18n={i18next} show={true} registration_messages={registration_messages} />);
      var title = screen.getByText("Your account is created.");
      var p1 = screen.getByText("An activation email is sent to the address test@example.com for you to activate your email so that you can log in.");
      var p2 = screen.getByText("If you haven't received the email, click here to resend it.");
      expect(title.textContent).toBe("Your account is created.");
      expect(p1.textContent).toBe("An activation email is sent to the address test@example.com for you to activate your email so that you can log in.");
      expect(p2.textContent).toBe("If you haven't received the email, click here to resend it.");
    });
  });
  test('Should resend email success', async () => {
    await act(async () => {
      registration_messages.username = "resent_success";
      render(<SignInUpConfirmationModal i18n={i18next} show={true} registration_messages={registration_messages} />);
      var p2 = screen.getByText("If you haven't received the email, click here to resend it.");
      fireEvent.click(p2);
      await waitFor(() => {
        var valid_message = screen.getByText("A new activation email is sent to the address test@example.com.");
        expect(valid_message.textContent).toBe("A new activation email is sent to the address test@example.com.");
      });
    });
  });
  test('Should resend email failed', async () => {
    await act(async () => {
      registration_messages.username = "resent_failed";
      render(<SignInUpConfirmationModal i18n={i18next} show={true} registration_messages={registration_messages} />);
      var p2 = screen.getByText("If you haven't received the email, click here to resend it.");
      fireEvent.click(p2);
      await waitFor(() => {
        var valid_message = screen.getByText("Your email address is already validated!");
        var valid_message2 = screen.getByText("You can now log in with your username/email and password.");
        expect(valid_message.textContent).toBe("Your email address is already validated!");
        expect(valid_message2.textContent).toBe("You can now log in with your username/email and password.");
      });
    });
  });
  test('Should resend email failed for no exists username', async () => {
    await act(async () => {
      registration_messages.username = "no_username";
      render(<SignInUpConfirmationModal i18n={i18next} show={true} registration_messages={registration_messages} />);
      var p2 = screen.getByText("If you haven't received the email, click here to resend it.");
      fireEvent.click(p2);
      await waitFor(() => {
        var invalid_message = screen.getByText("We couldn't find an account with that username: no_username!");
        expect(invalid_message.textContent).toBe("We couldn't find an account with that username: no_username!");
      });
    });
  });

  test('Should close button calls onHide', async () => {
    const closeFn = jest.fn();
    await act(async () => {
      const { container } = render(<SignInUpConfirmationModal i18n={i18next} show={true} registration_messages={registration_messages} onHide={closeFn}/>);
      var close_btn_siucm = screen.getByTestId('close_btn_siucm');
      fireEvent.click(close_btn_siucm, {target: {}});
      expect(closeFn).toHaveBeenCalledTimes(1);
    });
  });
});
