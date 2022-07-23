import CustomSelect from "./CustomSelect";
import { render, screen, fireEvent } from '@testing-library/react';
import { get_contries_select_options } from '../../utils/countries_list';
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
const countries_options = get_contries_select_options("fr");
describe('CustomSelect component', () => {
    test('Should render without crash', async () => {
        render(<CustomSelect />);
    });
    test('Should contains props values', async () => {
        render(<CustomSelect label={"Label test"} placeholder={"Placeholder test"}  value={"MA"} countries_options={countries_options}/>);
        const label = screen.getByTestId('label');
        const select_text = screen.getByText('Maroc');
        expect(label.textContent).toBe('Label test');
        expect(select_text.textContent).toBe('Maroc');
    });
    test('Should contains props values (invalid_message)', async () => {
        render(<CustomSelect value={""}  invalid_message={"Invalid message"}/>);
        var invalid_message = screen.getByText('Invalid message');
        expect(invalid_message.textContent).toBe("Invalid message");
    });
    test('Should contains props values (error_message)', async () => {
        render(<CustomSelect value={""}  error_message={"Error message"}  invalid_message={"Invalid message"}/>);
        var error_message = screen.getByText('Error message');
        expect(error_message.textContent).toBe("Error message");
    });
    test('Should contains props values (valid_message)', async () => {
        render(<CustomSelect value={""}  valid_message={"Valid message"} />);
        var valid_message = screen.getByText('Valid message');
        expect(valid_message.textContent).toBe("Valid message");
    });
});