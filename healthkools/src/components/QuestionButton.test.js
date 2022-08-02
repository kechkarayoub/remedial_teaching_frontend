import QuestionButton from "./QuestionButton";
import { render, screen } from '@testing-library/react';
import i18next from '../i18n_init';
 
describe('QuestionButton component', () => {
    test('Should render without crash', async () => {
        render(<QuestionButton i18n={i18next}/>);
    });
    test('Should contains text props', async () => {
        render(<QuestionButton i18n={i18next} text="Text"/>);
        const text = screen.getByText('Text');
        expect(text.textContent).toBe("Text");
    });
    test('Should contains test id', async () => {
        render(<QuestionButton i18n={i18next} text="Text" test_id="test_id"/>);
        const question_button = screen.getByTestId("test_id");
        expect(question_button.textContent).toBe('Text');
    });
});