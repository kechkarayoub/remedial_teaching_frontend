import ErrorComponent from "./ErrorComponent";
import { render, screen } from '@testing-library/react';
import i18next from '../i18n_init';
jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
}));
describe('ErrorComponent component', () => {
    test('Should render without crash', async () => {
        render(<ErrorComponent />);
    });
    test('Should contains button', async () => {
        render(<ErrorComponent />);
        const button = screen.getByRole('button');
        expect(button.textContent).toBe("Try again");
    });
});