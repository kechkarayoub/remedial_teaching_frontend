import FilesSelect from "components/FilesSelect";
import { fireEvent, render, screen } from '@testing-library/react';
import i18next from 'i18n_init';
 
describe('FilesSelect component', () => {
    test('Should render without crash', async () => {
        render(<FilesSelect i18n={i18next}/>);
    });
    test('Should contains text', async () => {
        render(<FilesSelect text={"Files select"} i18n={i18next}/>);
        const files_selects = screen.getAllByText("Files select");
        expect(files_selects.length).toBe(1);
    });
    test('Should contains test_id', async () => {
        render(<FilesSelect test_id={"test_id"} i18n={i18next}/>);
        const files_selects = screen.getAllByTestId("test_id");
        expect(files_selects.length).toBe(1);
    });
    test('On_change should not called on click', async () => {
        const on_change = jest.fn();
        render(<FilesSelect i18n={i18next} test_id={"test_id"} on_change={on_change}/>);
        const files_select = screen.getByTestId("test_id");
        expect(on_change).toHaveBeenCalledTimes(0);
        fireEvent.click(files_select, {target: {}});
        expect(on_change).toHaveBeenCalledTimes(0);
    });
    test('On_change should called on click input change', async () => {
        const on_change = jest.fn();
        render(<FilesSelect i18n={i18next} test_id={"test_id"} on_change={on_change}/>);
        const input_file = screen.getByTestId("input_test_id");
        expect(on_change).toHaveBeenCalledTimes(0);
        fireEvent.change(input_file, {target: {}});
        expect(on_change).toHaveBeenCalledTimes(1);
    });
    test('On_change should not called if disabled', async () => {
        const on_change = jest.fn();
        render(<FilesSelect i18n={i18next} test_id={"test_id"} on_change={on_change} disabled={true}/>);
        const input_file = screen.getByTestId("input_test_id");
        expect(on_change).toHaveBeenCalledTimes(0);
        fireEvent.click(input_file, {target: {}});
        expect(on_change).toHaveBeenCalledTimes(0);
    });
});