import HKPassword from "./HKPassword";
import { render, screen, fireEvent } from '@testing-library/react';
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('HKPassword component', () => {
    test('Should render without crash', async () => {
        render(<HKPassword />);
    });
    test('Should contains props values', async () => {
        render(<HKPassword label={"Label test"} placeholder={"Placeholder test"}  value={"Value test"}/>);
        const label = screen.getByTestId('label');
        const input = screen.getByTestId('input');
        const toggle_show_password = screen.getByTestId('toggle_show_password');
        expect(label.textContent).toBe('Label test');
        expect(input.type).toBe('password');
        expect(input.value).toBe('Value test');
        expect(input.placeholder).toBe('Placeholder test');
        fireEvent.change(input, {target: {value: '23'}});
        expect(input.value).toBe('23');
        fireEvent.click(toggle_show_password);
        expect(input.type).toBe('text');
        fireEvent.click(toggle_show_password);
        expect(input.type).toBe('password');
    });
});