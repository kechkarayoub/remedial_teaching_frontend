import CustomButton from "components/CustomButton";
import i18next from 'i18n_init';
import { fireEvent, render, screen } from '@testing-library/react';
 
describe('CustomButton component', () => {
    test('Should render without crash', async () => {
        render(<CustomButton i18n={i18next}/>);
    });
    test('Should contains text props', async () => {
        render(<CustomButton text={"Button"} i18n={i18next}/>);
        const button = screen.getByRole('button');
        expect(button.textContent).toBe("Button");
    });
    test('Should contains test id', async () => {
        render(<CustomButton text={"Button"} i18n={i18next} test_id="test_id"/>);
        const button = screen.getByTestId("test_id");
        expect(button.textContent).toBe("Button");
    });
    test('On_click should called on click', async () => {
        const on_click = jest.fn();
        render(<CustomButton text={"Button"} i18n={i18next} test_id="test_id" on_click={on_click}/>);
        const button = screen.getByTestId("test_id");
        expect(on_click).toHaveBeenCalledTimes(0);
        fireEvent.click(button, {target: {}});
        expect(on_click).toHaveBeenCalledTimes(1);
    });
    test('On_click should not called if disabled', async () => {
        const on_click = jest.fn();
        render(<CustomButton text={"Button"} i18n={i18next} test_id="test_id" on_click={on_click} disabled={true}/>);
        const button = screen.getByTestId("test_id");
        expect(on_click).toHaveBeenCalledTimes(0);
        fireEvent.click(button, {target: {}});
        expect(on_click).toHaveBeenCalledTimes(0);
    });
});
