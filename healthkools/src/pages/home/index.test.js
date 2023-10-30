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

export const feeds_items_data =  {
  status: "ok",
  feed: {},
  items: [
    {
      title: "Telehealth and the school nurse \u2014 with Marcos Domiciano",
      pubDate: "2021-10-01 00:00:00",
      link: "https://www.mobihealthnews.com/news/telehealth-and-school-nurse-marcos-domiciano",
      guid: "150808",
      author: "jonah.comstock@himssmedia.com (MobiHealthNews)",
      thumbnail: "",
      description: "TytoCare's Marcos Domiciano joins host Jonah Comstock\u00a0 to discuss the challenges and opportunities of telehealth in schools.\u00a0",
      content: "TytoCare's Marcos Domiciano joins host Jonah Comstock\u00a0 to discuss the challenges and opportunities of telehealth in schools.\u00a0",
      enclosure: {
        link: "https://www.mobihealthnews.com/sites/default/files/podcast background template_0_0.jpg",
        type: "image/jpeg",
        length: 293989
      },
      categories: []
    }
  ]
};

describe('Home component', () => {
  test('Should render without crash', async () => {
    render(<Home i18n={i18next} />);
  });
  test('Should contains general information response data', async () => {
    render(<Home i18n={i18next}/>);
    const contact_email = await screen.findByText(general_information_response.contact_email);
    const site_name = await screen.findByText(moment().format("YYYY") + " © " + (general_information_response.site_name || "Healthkools"));
    expect(contact_email).toBeInTheDocument();
    expect(site_name).toBeInTheDocument();
  });
  //to be continued
});
