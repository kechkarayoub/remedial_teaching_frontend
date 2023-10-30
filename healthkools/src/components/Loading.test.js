import Loading from "components/Loading";
import { render, screen } from '@testing-library/react';
import i18next from 'i18n_init';
 
describe('Loading component', () => {
    test('Should render without crash', async () => {
        render(<Loading i18n={i18next}/>);
        const loadings_css = screen.getAllByTestId('loading_css_test_id');
        expect(loadings_css.length).toBe(1);
    });
    test('Should contains added_class props', async () => {
        render(<Loading i18n={i18next} added_class={"added_class"}/>);
        const loading_css = screen.getByTestId('loading_css_test_id');
        expect(loading_css.classList).toContain("added_class");
    });
    test('Should contains children', async () => {
        render(<Loading i18n={i18next} added_class={"added_class"}/>);
        const loading_css = screen.getByTestId('loading_css_test_id');
        const lds_defaults = loading_css.querySelectorAll('.lds-default');
        expect(lds_defaults.length).toBe(1);
        const divs = loading_css.querySelectorAll('.lds-default div');
        expect(divs.length).toBe(12);
    });
});
