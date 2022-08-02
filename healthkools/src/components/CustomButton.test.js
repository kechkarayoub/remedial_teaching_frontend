import CustomButton from "./CustomButton";
import { render, screen } from '@testing-library/react';
import i18next from '../i18n_init';
 
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
});