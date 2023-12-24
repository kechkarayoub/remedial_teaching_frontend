import HomeHeader from "pages/home/components/HomeHeader";
import logo from "assets/img/logo_temp.jpg";
import sign_in from "assets/img/sign_in.svg";
import sign_up from "assets/img/sign_up.svg";
import { languages } from "components/LanguageSelect/index";
import { render, screen } from '@testing-library/react';

jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 

describe('HomeHeader component', () => {
    test('Should render without crash', async () => {
        render(<HomeHeader />);
    });
    test('Should contains child components', async () => {
        const { container } = render(<HomeHeader />);
        const sign_in_image = screen.getByAltText('Sign in icon');
        const sign_up_image = screen.getByAltText('Sign up icon');
        const language_select = screen.getByRole('languages_select');
        const image_language = container.getElementsByClassName('selacted_language_flag')[0];
        const image_logo = screen.getByAltText('Logo image');
        expect(container.getElementsByClassName('selacted_language_flag').length).toBe(1);
        expect(image_logo.src).toContain(logo);
        expect(sign_in_image.src).toContain(sign_in);
        expect(sign_up_image.src).toContain(sign_up);
        expect(image_language.src).toContain(languages[2].flag);
        expect(language_select.textContent).toBe(languages[2].short_name);
    });
});
