import HKButtonIcon from "./HKButtonIcon";
import { render, screen } from '@testing-library/react';
import sign_in from "../assets/img/sign_in.svg";
jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('HKButtonIcon component', () => {
    test('Should render without crash', async () => {
        render(<HKButtonIcon />);
    });
    test('Should contains image props', async () => {
        render(<HKButtonIcon image={sign_in} alt="Sign in icon"/>);
        const image = screen.getByAltText('Sign in icon');
        expect(image.src).toContain(sign_in);
    });
});