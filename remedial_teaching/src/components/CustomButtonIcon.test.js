import CustomButtonIcon from "components/CustomButtonIcon";
import sign_in from "assets/img/sign_in.svg";
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 

describe('CustomButtonIcon component', () => {
    test('Should render without crash', async () => {
        render(<CustomButtonIcon />);
    });
    test('Should contains image props', async () => {
        render(<CustomButtonIcon image={sign_in} alt="Sign in icon"/>);
        const image = screen.getByAltText('Sign in icon');
        expect(image.src).toContain(sign_in);
    });
    test('On_click should called on click', async () => {
        const on_click = jest.fn();
        render(<CustomButtonIcon image={sign_in} alt="Sign in icon" on_click={on_click}/>);
        const image = screen.getByAltText('Sign in icon');
        expect(on_click).toHaveBeenCalledTimes(0);
        fireEvent.click(image, {target: {}});
        expect(on_click).toHaveBeenCalledTimes(1);
    });
});
