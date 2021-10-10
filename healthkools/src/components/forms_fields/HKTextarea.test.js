import HKTextarea from "./HKTextarea";
import { render, screen, fireEvent } from '@testing-library/react';
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('HKTextarea component', () => {
    test('Should render without crash', async () => {
        render(<HKTextarea />);
    });
    test('Should contains props values', async () => {
        render(<HKTextarea label={"Label test"} placeholder={"Placeholder test"}  value={"Value test"} rows={3}/>);
        const label = screen.getByTestId('label');
        const textarea = screen.getByTestId('textarea');
        expect(label.textContent).toBe('Label test');
        expect(textarea.value).toBe('Value test');
        expect(textarea.placeholder).toBe('Placeholder test');
        fireEvent.change(textarea, {target: {value: 'address'}});
        expect(textarea.value).toBe('address');
        expect(textarea.rows).toBe(3);
    });
});