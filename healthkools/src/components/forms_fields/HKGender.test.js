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
    test('Should contains props values (invalid_message)', async () => {
        render(<HKGender value={""}  invalid_message={"Invalid message"}/>);
        var invalid_message = screen.getByText('Invalid message');
        expect(invalid_message.textContent).toBe("Invalid message");
    });
    test('Should contains props values (error_message)', async () => {
        render(<HKGender value={""}  error_message={"Error message"}  invalid_message={"Invalid message"}/>);
        var error_message = screen.getByText('Error message');
        expect(error_message.textContent).toBe("Error message");
    });
    test('Should contains props values (valid_message)', async () => {
        render(<HKGender value={""}  valid_message={"Valid message"} />);
        var valid_message = screen.getByText('Valid message');
        expect(valid_message.textContent).toBe("Valid message");
    });
});