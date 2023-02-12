import CustomDate from "components/forms_fields/CustomDate";
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
    test('Should on_change called', async () => {
        const on_change = jest.fn();
        render(<CustomDate label={"Label test"} placeholder={"Placeholder test"} on_change={on_change} value={moment("2023-01-01", 'YYYY-MM-DD').toDate()}/>);
        var input = screen.getByPlaceholderText('Placeholder test');
        expect(input.value).toBe(moment("2023-01-01", 'YYYY-MM-DD').format("DD/MM/YYYY"));
        var days_options = screen.queryAllByRole('option');
        expect(on_change).toHaveBeenCalledTimes(0);
        fireEvent.click(input, {target: {}});
        days_options = screen.queryAllByRole('option');
        expect(days_options.length).toBe(42);
        fireEvent.click(days_options[18]);
        days_options = screen.queryAllByRole('option');
        expect(days_options.length).toBe(0);
        expect(on_change).toHaveBeenCalledTimes(1);
    });
    test('Should on_change not called because of max_date', async () => {
        const on_change = jest.fn();
        render(<CustomDate label={"Label test"} placeholder={"Placeholder test"} max_date={moment().add(-6, "years").toDate()}
            on_change={on_change} value={moment("2023-01-01", 'YYYY-MM-DD').toDate()} 
        />);
        var input = screen.getByPlaceholderText('Placeholder test');
        expect(input.value).toBe(moment("2023-01-01", 'YYYY-MM-DD').format("DD/MM/YYYY"));
        var days_options = screen.queryAllByRole('option');
        expect(on_change).toHaveBeenCalledTimes(0);
        fireEvent.click(input, {target: {}});
        days_options = screen.queryAllByRole('option');
        expect(days_options.length).toBe(42);
        fireEvent.click(days_options[18]);
        days_options = screen.queryAllByRole('option');
        expect(days_options.length).toBe(42);
        expect(on_change).toHaveBeenCalledTimes(0);
    });
    test('Should on_change not called because of min_date', async () => {
        const on_change = jest.fn();
        render(<CustomDate label={"Label test"} placeholder={"Placeholder test"} min_date={moment().add(6, "years").toDate()}
            on_change={on_change} value={moment("2023-01-01", 'YYYY-MM-DD').toDate()} 
        />);
        var input = screen.getByPlaceholderText('Placeholder test');
        expect(input.value).toBe(moment("2023-01-01", 'YYYY-MM-DD').format("DD/MM/YYYY"));
        var days_options = screen.queryAllByRole('option');
        expect(on_change).toHaveBeenCalledTimes(0);
        fireEvent.click(input, {target: {}});
        days_options = screen.queryAllByRole('option');
        expect(days_options.length).toBe(42);
        fireEvent.click(days_options[18]);
        days_options = screen.queryAllByRole('option');
        expect(days_options.length).toBe(42);
        expect(on_change).toHaveBeenCalledTimes(0);
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