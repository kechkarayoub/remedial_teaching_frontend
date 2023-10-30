import App from './App'; // Update the path to your component
import moment from "moment";
import React from 'react';
import { get } from "services/storage";
import { render, screen, waitFor } from '@testing-library/react';

describe('App', () => {
  test('Should renders without crashing', () => {
    render(<App />);
  });

  it('loads the home page by default', async () => {
    render(<App />);
    // Wait for the component to finish rendering and check if a component from the home page is present.
    await waitFor(() => {
      const general_information = get("general_information");
      expect(screen.getByText(moment().format("YYYY") + " © " + (general_information.site_name || "Healthkools"))).toBeInTheDocument(); // Update with your actual content
    });
  });

  // to reverified for this Warning: You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored
});
