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
    test('Should contains props values (disabled)', async () => {
        render(<HKPassword placeholder={"Placeholder test"}  value={""} disabled={true}/>);
        const input = screen.getByTestId('input');
        expect(input.disabled).toBe(true);
    });
    test('Should contains props values (invalid_message)', async () => {
        render(<HKPassword value={""}  invalid_message={"Invalid message"}/>);
        var invalid_message = screen.getByText('Invalid message');
        expect(invalid_message.textContent).toBe("Invalid message");
    });
    test('Should contains props values (error_message)', async () => {
        render(<HKPassword value={""}  error_message={"Error message"}  invalid_message={"Invalid message"}/>);
        var error_message = screen.getByText('Error message');
        expect(error_message.textContent).toBe("Error message");
    });
    test('Should contains props values (valid_message)', async () => {
        render(<HKPassword value={""}  valid_message={"Valid message"} />);
        var valid_message = screen.getByText('Valid message');
        expect(valid_message.textContent).toBe("Valid message");
    });
});