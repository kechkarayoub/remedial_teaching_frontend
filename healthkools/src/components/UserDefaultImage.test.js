import UserDefaultImage from "components/UserDefaultImage";
import { fireEvent, render, screen } from '@testing-library/react';
import i18next from 'i18n_init';
 
describe('UserDefaultImage component', () => {
    test('Should render without crash', async () => {
        render(<UserDefaultImage i18n={i18next}/>);
    });
    test('On_click should called on click', async () => {
        const on_click = jest.fn();
        render(<UserDefaultImage i18n={i18next} on_click={on_click}/>);
        const image = screen.getByRole('img');
        expect(on_click).toHaveBeenCalledTimes(0);
        fireEvent.click(image, {target: {}});
        expect(on_click).toHaveBeenCalledTimes(1);
    });
});