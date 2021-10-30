import HKCheckbox from "./HKCheckbox";
import { render, screen, fireEvent } from '@testing-library/react';
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('HKCheckbox component', () => {
    test('Should render without crash', async () => {
        render(<HKCheckbox />);
    });
    test('Should contains props values', async () => {
        const { container } = render(<HKCheckbox label={"Label test"} checked={true}/>);
        const label = screen.getByText('Label test');
        var checked_icon = container.getElementsByClassName('checkbox_icon')[0];
        expect(checked_icon || null).not.toBeNull();
        expect(label.textContent).toBe('Label test');
    });
    test('Should clik change value', async () => {
        const { container } = render(<HKCheckbox label={"Label test"} checked={true}/>);
        var checked_icon = container.getElementsByClassName('checkbox_icon')[0];
        var input = checked_icon.closest(".field").querySelector("input");
        fireEvent.click(input, {target: {checked: false}});
        var checked_icon = container.getElementsByClassName('checkbox_icon')[0];
        expect(checked_icon || null).toBeNull();
        fireEvent.click(input, {target: {checked: true}});
        var checked_icon = container.getElementsByClassName('checkbox_icon')[0];
        expect(checked_icon || null).not.toBeNull();
    });
    test('Should contains props values (disabled)', async () => {
        const { container } = render(<HKCheckbox checked={true} disabled={true}/>);
        var checked_icon = container.getElementsByClassName('checkbox_icon')[0];
        var input = checked_icon.closest(".field").querySelector("input");
        expect(input.disabled).toBe(true);
    });
    test('Should contains props values (invalid_message)', async () => {
        render(<HKCheckbox invalid_message={"Invalid message"}/>);
        var invalid_message = screen.getByText('Invalid message');
        expect(invalid_message.textContent).toBe("Invalid message");
    });
    test('Should contains props values (error_message)', async () => {
        render(<HKCheckbox error_message={"Error message"}  invalid_message={"Invalid message"}/>);
        var error_message = screen.getByText('Error message');
        expect(error_message.textContent).toBe("Error message");
    });
    test('Should contains props values (valid_message)', async () => {
        render(<HKCheckbox valid_message={"Valid message"} />);
        var valid_message = screen.getByText('Valid message');
        expect(valid_message.textContent).toBe("Valid message");
    });
});