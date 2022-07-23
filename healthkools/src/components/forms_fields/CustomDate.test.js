import CustomDate from "./CustomDate";
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from "moment";
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('CustomDate component', () => {
    test('Should render without crash', async () => {
        render(<CustomDate />);
    });
    test('Should contains props values', async () => {
        render(<CustomDate label={"Label test"} placeholder={"Placeholder test"}  value={null}/>);
        const label = screen.getByTestId('label');
        const input = screen.getByPlaceholderText('Placeholder test');
        expect(label.textContent).toBe('Label test');
        expect(input.value).toBe('');
        expect(input.placeholder).toBe('Placeholder test');
    });
    test('Should date change', async () => {
        render(<CustomDate label={"Label test"} placeholder={"Placeholder test"}  value={new Date()}/>);
        const input = screen.getByPlaceholderText('Placeholder test');
        expect(input.value).toBe(moment().format("DD/MM/YYYY"));
    });
    test('Should contains props values', async () => {
        render(<CustomDate label={"Label test"} placeholder={"Placeholder test"}  value={moment().toDate()}/>);
        const label = screen.getByTestId('label');
        const input = screen.getByPlaceholderText('Placeholder test');
        expect(label.textContent).toBe('Label test');
        expect(input.value).toBe(moment().format("DD/MM/YYYY"));
        expect(input.placeholder).toBe('Placeholder test');
    });
    test('Should contains props values (disabled)', async () => {
        render(<CustomDate placeholder={"Placeholder test"}  value={moment().toDate()} disabled={true}/>);
        const input = screen.getByPlaceholderText('Placeholder test');
        expect(input.disabled).toBe(true);
    });
    test('Should contains props values (invalid_message)', async () => {
        render(<CustomDate value={moment().toDate()}  invalid_message={"Invalid message"}/>);
        var invalid_message = screen.getByText('Invalid message');
        expect(invalid_message.textContent).toBe("Invalid message");
    });
    test('Should contains props values (error_message)', async () => {
        render(<CustomDate value={moment().toDate()}  error_message={"Error message"}  invalid_message={"Invalid message"}/>);
        var error_message = screen.getByText('Error message');
        expect(error_message.textContent).toBe("Error message");
    });
    test('Should contains props values (valid_message)', async () => {
        render(<CustomDate value={moment().toDate()}  valid_message={"Valid message"} />);
        var valid_message = screen.getByText('Valid message');
        expect(valid_message.textContent).toBe("Valid message");
    });
});