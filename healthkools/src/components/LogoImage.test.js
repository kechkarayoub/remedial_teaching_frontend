import LogoImage from "components/LogoImage";
import { render, screen } from '@testing-library/react';
import {images} from "components/_resources";
import defaultRssImg from "assets/img/default_rss_img.png";
import i18next from 'i18n_init';
 
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
});