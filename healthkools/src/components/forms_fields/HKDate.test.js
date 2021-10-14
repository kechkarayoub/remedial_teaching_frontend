import HKDate from "./HKDate";
import { render, screen, fireEvent } from '@testing-library/react';
import moment from "moment";
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('HKDate component', () => {
    test('Should render without crash', async () => {
        render(<HKDate />);
    });
    test('Should contains props values', async () => {
        render(<HKDate label={"Label test"} placeholder={"Placeholder test"}  value={null}/>);
        const label = screen.getByTestId('label');
        const input = screen.getByPlaceholderText('Placeholder test');
        expect(label.textContent).toBe('Label test');
        expect(input.value).toBe('');
        expect(input.placeholder).toBe('Placeholder test');
    });
    test('Should contains props values', async () => {
        render(<HKDate label={"Label test"} placeholder={"Placeholder test"}  value={moment().toDate()}/>);
        const label = screen.getByTestId('label');
        const input = screen.getByPlaceholderText('Placeholder test');
        expect(label.textContent).toBe('Label test');
        expect(input.value).toBe(moment().format("DD/MM/YYYY"));
        expect(input.placeholder).toBe('Placeholder test');
    });
});