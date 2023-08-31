import { render_term_service_url, render_term_service_custom_text } from "components/terms_of_service/utils";

describe('Render_term_service_url function', () => {
    test('Should render without crash', async () => {
        render_term_service_url();
    });
  
    test('Should contains props', async () => {
      expect(render_term_service_url("url_link", "url_label")).toBe("<a href='url_link' target=\"_blank\">url_label</a>");
    });
});
describe('Render_term_service_custom_text function', () => {
      test('Should render without crash', async () => {
          render_term_service_custom_text();
      });
    
      test('Should contains props', async () => {
        expect(render_term_service_custom_text("text")).toBe('<b>text</b>');
      });
});