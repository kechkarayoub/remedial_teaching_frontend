import Footer from "components/Footer";
import { render, screen } from '@testing-library/react';
import {images} from "components/_resources";

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('Footer component', () => {
    test('Should render without crash', async () => {
        render(<Footer/>);
    });
    test('Should contains default logo image logo', async () => {
        render(<Footer/>);
        const image = screen.getByRole('img');
        expect(image.src).toContain("/" + images.logo);
    });
});