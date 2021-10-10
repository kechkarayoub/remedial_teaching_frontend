import HKSelect from "./HKSelect";
import { render, screen, fireEvent } from '@testing-library/react';
import { get_contries_select_options } from '../../utils/countries_list';
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
const countries_options = get_contries_select_options("fr");
describe('HKSelect component', () => {
    test('Should render without crash', async () => {
        render(<HKSelect />);
    });
    test('Should contains props values', async () => {
        render(<HKSelect label={"Label test"} placeholder={"Placeholder test"}  value={"MA"} countries_options={countries_options}/>);
        const label = screen.getByTestId('label');
        const select_text = screen.getByText('Maroc');
        expect(label.textContent).toBe('Label test');
        expect(select_text.textContent).toBe('Maroc');
    });
});