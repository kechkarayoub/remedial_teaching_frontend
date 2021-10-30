import HKInput from "./HKInput";
import { render, screen, fireEvent } from '@testing-library/react';
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('HKInput component', () => {
    test('Should render without crash', async () => {
        render(<HKInput />);
    });
    test('Should contains props values', async () => {
        render(<HKInput label={"Label test"} placeholder={"Placeholder test"}  value={"Value test"}/>);
        const label = screen.getByTestId('label');
        const input = screen.getByTestId('input');
        expect(label.textContent).toBe('Label test');
        expect(input.value).toBe('Value test');
        expect(input.placeholder).toBe('Placeholder test');
        fireEvent.change(input, {target: {value: '23'}});
        expect(input.value).toBe('23');
    });
    test('Should contains props values (disabled)', async () => {
        render(<HKInput placeholder={"Placeholder test"}  value={""} disabled={true}/>);
        const input = screen.getByTestId('input');
        expect(input.disabled).toBe(true);
    });
    test('Should contains props values (invalid_message)', async () => {
        render(<HKInput value={""}  invalid_message={"Invalid message"}/>);
        var invalid_message = screen.getByText('Invalid message');
        expect(invalid_message.textContent).toBe("Invalid message");
    });
    test('Should contains props values (error_message)', async () => {
        render(<HKInput value={""}  error_message={"Error message"}  invalid_message={"Invalid message"}/>);
        var error_message = screen.getByText('Error message');
        expect(error_message.textContent).toBe("Error message");
    });
    test('Should contains props values (valid_message)', async () => {
        render(<HKInput value={""}  valid_message={"Valid message"} />);
        var valid_message = screen.getByText('Valid message');
        expect(valid_message.textContent).toBe("Valid message");
    });
});