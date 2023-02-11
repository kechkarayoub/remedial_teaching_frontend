import Language from "components/LanguageSelect/component/Language";
import { render, screen, fireEvent } from '@testing-library/react';
import {languages} from "components/LanguageSelect/index"
jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('Language component', () => {
    const language = languages[0];
    test('Should render without crash', async () => {
        render(<Language language={language} selected_language="fr"/>);
    });
    test('Should contains image url', async () => {
        render(<Language language={language} selected_language="fr"/>);
        const image = screen.getByRole('img');
        expect(image.src).toContain(language.flag);
    });
    test('Name rendred', async () => {
        render(<Language language={language} selected_language="fr"/>);
        const li_language = screen.getByRole('language');
        expect(li_language.textContent).toBe(language.short_name);
    });
    test('HandleSelectLanguage called on click', async () => {
        const handleSelectLanguage = jest.fn();
        render(<Language language={language} selected_language="fr" handleSelectLanguage={handleSelectLanguage}/>);
        const li_language = screen.getByRole('language');
        expect(handleSelectLanguage).toHaveBeenCalledTimes(0);
        fireEvent.click(li_language, {target: {}});
        expect(handleSelectLanguage).toHaveBeenCalledTimes(1);
    });
});