import OAuthButtonContainer from "pages/home/components/OAuthButtonContainer";
import { render, screen, fireEvent, act } from '@testing-library/react';
import i18next from 'i18n_init';
 
describe('OAuthButtonContainer component', () => {
  test('Should render without crash', async () => {
    render(<OAuthButtonContainer i18n={i18next}/>);
    render(<OAuthButtonContainer i18n={i18next} oauth_type="google"/>);
  });
  test('Should render empty element if oauth_type not in ["google"]', async () => {
    const { container } = render(<OAuthButtonContainer i18n={i18next} />);
    expect(container).toBeEmptyDOMElement();
  });
  test('Should render button container', async () => {
    render(<OAuthButtonContainer i18n={i18next}  oauth_type="google" />);
    var oauth_buttons = screen.getAllByTestId('custom_oauth_button_container_test_id');
    expect(oauth_buttons.length).toBe(1);
  });
  test('Should use test_id prop', async () => {
    render(<OAuthButtonContainer i18n={i18next}  oauth_type="google" test_id="teeesttt" />);
    var oauth_buttons = screen.getAllByTestId('teeesttt');
    //screen.debug()
    expect(oauth_buttons.length).toBe(1);
  });
  test('Should separator not appear', async () => {
    render(<OAuthButtonContainer i18n={i18next}  oauth_type="google" test_id="teeesttt" />);
    var oauth_separator = screen.queryAllByTestId('oauth_separator');
    expect(oauth_separator.length).toBe(0);
  });
  test('Should separator appear', async () => {
    render(<OAuthButtonContainer i18n={i18next}  oauth_type="google" test_id="teeesttt" show_separator={true} />);
    var oauth_separator = screen.getAllByTestId('oauth_separator');
    expect(oauth_separator.length).toBe(1);
  });
});