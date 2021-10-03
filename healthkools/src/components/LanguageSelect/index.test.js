import LanguagesSelect, {languages} from "./index";
import { render, screen } from '@testing-library/react';
jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('LanguagesSelect component', () => {
    test('Should render without crash', async () => {
        render(<LanguagesSelect />);
    });
    test('Should contains sected language image url', async () => {
        render(<LanguagesSelect />);
        const image = screen.getByRole('img');
        expect(image.src).toContain(languages[2].flag);
    });
    test('Should contains languages images url', async () => {
        render(<LanguagesSelect open={true} />);
        const images = screen.getAllByRole('img');
        expect(images[0].src).toContain(languages[2].flag);
        expect(images[1].src).toContain(languages[0].flag);
        expect(images[2].src).toContain(languages[1].flag);
        expect(images[3].src).toContain(languages[2].flag);
    });
    test('Name rendred', async () => {
        render(<LanguagesSelect />);
        const div_language = screen.getByRole('languages_select');
        expect(div_language.textContent).toBe(languages[2].short_name);
    });
});