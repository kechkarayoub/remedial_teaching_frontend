import CustomCheckbox from "components/forms_fields/CustomCheckbox";
import { render, screen, fireEvent, act } from '@testing-library/react';
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('CustomCheckbox component', () => {
    test('Should render without crash', async () => {
        render(<CustomCheckbox />);
    });
    test('Should contains props values', async () => {
        const { container } = render(<CustomCheckbox label={"Label test"} checked={true}/>);
        const label = screen.getByText('Label test');
        var checked_icon = container.getElementsByClassName('checkbox_icon')[0];
        expect(checked_icon || null).not.toBeNull();
        expect(label.textContent).toBe('Label test');
    });
    test('Should clik change value', async () => {
        const { container } = render(<CustomCheckbox label={"Label test"} checked={true}/>);
        var checked_icon = container.getElementsByClassName('checkbox_icon')[0];
        var input = checked_icon.closest(".field").querySelector("input");
        fireEvent.click(input, {target: {checked: false}});
        var checked_icon = container.getElementsByClassName('checkbox_icon')[0];
        expect(checked_icon || null).toBeNull();
        fireEvent.click(input, {target: {checked: true}});
        var checked_icon = container.getElementsByClassName('checkbox_icon')[0];
        expect(checked_icon || null).not.toBeNull();
    });
    test('Should clik call on_change', async () => {
        const on_change = jest.fn();
        const { container } = render(<CustomCheckbox label={"Label test"} vvvv='rr' checked={true} on_change={on_change}/>);
        var checked_icon = container.getElementsByClassName('checkbox_icon')[0];
        var input = checked_icon.closest(".field").querySelector("input");
        expect(on_change).toHaveBeenCalledTimes(0);
        fireEvent.click(input, {target: {checked: true}});
        expect(on_change).toHaveBeenCalledTimes(1);
    });
    test('Should clik not call on_change because of disabled', async () => {
        const on_change = jest.fn();
        const { container } = render(<CustomCheckbox label={"Label test"} disabled={true} checked={true} on_change={on_change}/>);
        var checked_icon = container.getElementsByClassName('checkbox_icon')[0];
        var input = checked_icon.closest(".field").querySelector("input");
        expect(on_change).toHaveBeenCalledTimes(0);
        fireEvent.click(input, {target: {checked: true}});
        expect(on_change).toHaveBeenCalledTimes(0);
    });
    test('Should contains props values (disabled)', async () => {
        const { container } = render(<CustomCheckbox checked={true} disabled={true}/>);
        var checked_icon = container.getElementsByClassName('checkbox_icon')[0];
        var input = checked_icon.closest(".field").querySelector("input");
        expect(input.disabled).toBe(true);
    });
    test('Should contains props values (invalid_message)', async () => {
        render(<CustomCheckbox invalid_message={"Invalid message"}/>);
        var invalid_message = screen.getByText('Invalid message');
        expect(invalid_message.textContent).toBe("Invalid message");
    });
    test('Should contains props values (error_message)', async () => {
        render(<CustomCheckbox error_message={"Error message"}  invalid_message={"Invalid message"}/>);
        var error_message = screen.getByText('Error message');
        expect(error_message.textContent).toBe("Error message");
    });
    test('Should contains props values (valid_message)', async () => {
        render(<CustomCheckbox valid_message={"Valid message"} />);
        var valid_message = screen.getByText('Valid message');
        expect(valid_message.textContent).toBe("Valid message");
    });
});