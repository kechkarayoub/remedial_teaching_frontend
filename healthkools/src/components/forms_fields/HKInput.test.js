import HKInput from "./HKInput";
import { render, screen, fireEvent } from '@testing-library/react';
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('HKInput component', () => {
    test('Should render without crash', async () => {
        render(<HKInput />);
    });
    test('Should contains props values', async () => {
        render(<HKInput label={"Label test"} placeholder={"Placeholder test"}  value={"Value test"}/>);
        const label = screen.getByTestId('label');
        const input = screen.getByTestId('input');
        expect(label.textContent).toBe('Label test');
        expect(input.value).toBe('Value test');
        expect(input.placeholder).toBe('Placeholder test');
        fireEvent.change(input, {target: {value: '23'}});
        expect(input.value).toBe('23');
    });
});