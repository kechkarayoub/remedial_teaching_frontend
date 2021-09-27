import HKButton from "./HKButton";
import { render, screen } from '@testing-library/react';
import i18next from '../i18n_init';
 
describe('HKButton component', () => {
    test('Should render without crash', async () => {
        render(<HKButton i18n={i18next}/>);
    });
    test('Should contains text props', async () => {
        render(<HKButton text={"Button"} i18n={i18next}/>);
        const button = screen.getByRole('button');
        expect(button.textContent).toBe("Button");
    });
});