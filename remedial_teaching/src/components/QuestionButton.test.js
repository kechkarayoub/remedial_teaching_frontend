import i18next from 'i18n_init';
import QuestionButton from "components/QuestionButton";
import { fireEvent, render, screen } from '@testing-library/react';
 
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
    test('On_click should called on click', async () => {
        const on_click = jest.fn();
        render(<QuestionButton i18n={i18next} text="Text" test_id="test_id" on_click={on_click}/>);
        const question_button = screen.getByTestId("test_id");
        expect(on_click).toHaveBeenCalledTimes(0);
        fireEvent.click(question_button, {target: {}});
        expect(on_click).toHaveBeenCalledTimes(1);
    });
});
