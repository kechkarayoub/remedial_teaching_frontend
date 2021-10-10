import HKGender from "./HKGender";
import { render, screen, fireEvent } from '@testing-library/react';
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('HKGender component', () => {
    test('Should render without crash', async () => {
        render(<HKGender />);
    });
    test('Should contains props values', async () => {
        render(<HKGender label={"Label test"} value={""}/>);
        const label = screen.getByTestId('label');
        var mars = screen.getByTestId('mars');
        var venus = screen.getByTestId('venus');
        var mars_i = screen.getByTestId('mars_i');
        var venus_i = screen.getByTestId('venus_i');
        expect(label.textContent).toBe('Label test');
        expect(mars.textContent).toBe('Male');
        expect(venus.textContent).toBe('Female');
        fireEvent.click(mars_i);
        mars = screen.getByTestId('mars_a');
        expect(mars.textContent).toBe('Male');
        fireEvent.click(mars_i);
        mars = screen.getByTestId('mars');
        expect(mars.textContent).toBe('Male');
        fireEvent.click(venus_i);
        venus = screen.getByTestId('venus_a');
        expect(venus.textContent).toBe('Female');
        fireEvent.click(venus_i);
        venus = screen.getByTestId('venus');
        expect(venus.textContent).toBe('Female');
    });
});