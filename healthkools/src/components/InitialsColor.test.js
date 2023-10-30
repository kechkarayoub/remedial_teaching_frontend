import i18next from 'i18n_init';
import InitialsColor from "components/InitialsColor";
import { fireEvent, render, screen } from '@testing-library/react';
 
describe('InitialsColor component', () => {
    test('Should render without crash', async () => {
        render(<InitialsColor i18n={i18next}/>);
    });
    test('Should contains initials', async () => {
        render(<InitialsColor initials={"IN"} i18n={i18next}/>);
        const initials = screen.getAllByText('IN');
        expect(initials.length).toBe(1);
    });
    test('Should contains title', async () => {
        render(<InitialsColor title={"Initials color"} i18n={i18next}/>);
        const initials = screen.getAllByTitle("Initials color");
        expect(initials.length).toBe(1);
    });
    test('Should contains test_id', async () => {
        render(<InitialsColor test_id={"test_id"} i18n={i18next}/>);
        const initials = screen.getAllByTestId("test_id");
        expect(initials.length).toBe(1);
    });
    test('On_click should called on click', async () => {
        const on_click = jest.fn();
        render(<InitialsColor initials={"IN"} i18n={i18next} on_click={on_click}/>);
        const initials = screen.getByText('IN');
        expect(on_click).toHaveBeenCalledTimes(0);
        fireEvent.click(initials, {target: {}});
        expect(on_click).toHaveBeenCalledTimes(1);
    });
});
