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
});