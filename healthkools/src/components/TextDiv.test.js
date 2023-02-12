import TextDiv from "components/TextDiv";
import { fireEvent, render, screen } from '@testing-library/react';
import i18next from 'i18n_init';
 
describe('TextDiv component', () => {
    test('Should render without crash', async () => {
        render(<TextDiv i18n={i18next}/>);
    });
    test('Should contains text props', async () => {
        render(<TextDiv i18n={i18next} text="Text"/>);
        const text = screen.getByText('Text');
        expect(text.textContent).toBe("Text");
    });
    test('On_click should called on click', async () => {
        const on_click = jest.fn();
        render(<TextDiv i18n={i18next} text="Text" on_click={on_click}/>);
        const text = screen.getByText('Text');
        expect(on_click).toHaveBeenCalledTimes(0);
        fireEvent.click(text, {target: {}});
        expect(on_click).toHaveBeenCalledTimes(1);
    });
});