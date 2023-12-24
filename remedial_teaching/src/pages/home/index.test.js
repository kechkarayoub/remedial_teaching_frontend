import i18next from 'init_fcm';
import moment from 'moment';
import React from "react";
import { render, screen } from '@testing-library/react';
import { Home } from "pages/home/index";

jest.mock('react-i18next', () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
    return Component;
  },
}));

jest.mock('axios');

export const general_information_response =  {
  contact_email: 'email@email.com',
  site_name: 'Test name',
};

describe('Home component', () => {
  test('Should render without crash', async () => {
    render(<Home i18n={i18next} />);
  });
  test('Should contains general information response data', async () => {
    render(<Home i18n={i18next}/>);
    const contact_email = await screen.findByText(general_information_response.contact_email);
    const site_name = await screen.findByText(moment().format("YYYY") + " © " + (general_information_response.site_name || "Remedial teaching"));
    expect(contact_email).toBeInTheDocument();
    expect(site_name).toBeInTheDocument();
  });
  //to be continued
});
