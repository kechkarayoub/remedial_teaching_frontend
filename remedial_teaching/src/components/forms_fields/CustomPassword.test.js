import CustomPassword from "components/forms_fields/CustomPassword";
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 

describe('CustomPassword component', () => {
    test('Should render without crash', async () => {
        render(<CustomPassword />);
    });
    test('Should contains props values', async () => {
        render(<CustomPassword label={"Label test"} placeholder={"Placeholder test"}  value={"Value test"}/>);
        const label = screen.getByTestId('label');
        const input = screen.getByTestId('custom_password');
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
        render(<CustomPassword placeholder={"Placeholder test"}  value={""} disabled={true}/>);
        const input = screen.getByTestId('custom_password');
        expect(input.disabled).toBe(true);
    });
    test('Should contains props values (invalid_message)', async () => {
        render(<CustomPassword value={""}  invalid_message={"Invalid message"}/>);
        var invalid_message = screen.getByText('Invalid message');
        expect(invalid_message.textContent).toBe("Invalid message");
    });
    test('Should contains props values (error_message)', async () => {
        render(<CustomPassword value={""}  error_message={"Error message"}  invalid_message={"Invalid message"}/>);
        var error_message = screen.getByText('Error message');
        expect(error_message.textContent).toBe("Error message");
    });
    test('Should contains props values (valid_message)', async () => {
        render(<CustomPassword value={""}  valid_message={"Valid message"} />);
        var valid_message = screen.getByText('Valid message');
        expect(valid_message.textContent).toBe("Valid message");
    });
    test('Should contains test id', async () => {
        render(<CustomPassword value={"xxx"}  valid_message={"Valid message"} test_id="test_id"/>);
        const input = screen.getByTestId("test_id");
        expect(input.value).toBe('xxx');
    });
});
