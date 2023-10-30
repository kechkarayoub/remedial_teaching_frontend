import defaultRssImg from "assets/img/default_rss_img.png";
import i18next from 'i18n_init';
import LogoImage from "components/LogoImage";
import { images } from "components/_resources";
import { fireEvent, render, screen } from '@testing-library/react';
 
describe('LogoImage component', () => {
    test('Should render without crash', async () => {
        render(<LogoImage i18n={i18next}/>);
    });
    test('Should contains image url', async () => {
        render(<LogoImage image={defaultRssImg} i18n={i18next}/>);
        const image = screen.getByRole('img');
        expect(image.src).toContain("/" + defaultRssImg);
    });
    test('Should contains default logo image', async () => {
        render(<LogoImage i18n={i18next}/>);
        const image = screen.getByRole('img');
        expect(image.src).toContain("/" + images.logo);
    });
    test('On_click should called on click', async () => {
        const on_click = jest.fn();
        render(<LogoImage i18n={i18next} on_click={on_click}/>);
        const image = screen.getByRole('img');
        expect(on_click).toHaveBeenCalledTimes(0);
        fireEvent.click(image, {target: {}});
        expect(on_click).toHaveBeenCalledTimes(1);
    });
});
