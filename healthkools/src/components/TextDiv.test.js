import TextDiv from "components/TextDiv";
import { render, screen } from '@testing-library/react';
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
});