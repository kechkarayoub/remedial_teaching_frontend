import HKPhoneNumber from "./HKPhoneNumber";
import { render, screen, fireEvent } from '@testing-library/react';
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('HKPhoneNumber component', () => {
    test('Should render without crash', async () => {
        render(<HKPhoneNumber />);
    });
    test('Should contains props values', async () => {
        render(<HKPhoneNumber label={"Label test"} placeholder={"Placeholder test"}  value={"0600000000"}/>);
        const label = screen.getByTestId('label');
        const input = screen.getByPlaceholderText('Placeholder test');
        expect(label.textContent).toBe('Label test');
        expect(input.value).toBe('0600000000');
        expect(input.placeholder).toBe('Placeholder test');
    });
    test('Should contains props values (disabled)', async () => {
        render(<HKPhoneNumber placeholder={"Placeholder test"}  value={""} disabled={true}/>);
        const input = screen.getByPlaceholderText('Placeholder test');
        expect(input.disabled).toBe(true);
    });
    test('Should contains props values (invalid_message)', async () => {
        render(<HKPhoneNumber value={""}  invalid_message={"Invalid message"}/>);
        var invalid_message = screen.getByText('Invalid message');
        expect(invalid_message.textContent).toBe("Invalid message");
    });
    test('Should contains props values (error_message)', async () => {
        render(<HKPhoneNumber value={""}  error_message={"Error message"}  invalid_message={"Invalid message"}/>);
        var error_message = screen.getByText('Error message');
        expect(error_message.textContent).toBe("Error message");
    });
    test('Should contains props values (valid_message)', async () => {
        render(<HKPhoneNumber value={""}  valid_message={"Valid message"} />);
        var valid_message = screen.getByText('Valid message');
        expect(valid_message.textContent).toBe("Valid message");
    });
});