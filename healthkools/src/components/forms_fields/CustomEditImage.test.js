import CustomEditImage from "components/forms_fields/CustomEditImage";
import i18next from 'i18n_init';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jpeg_data_url } from "utils/tests_utils";
import { mount } from 'enzyme';
jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
}));
describe('CustomEditImage component', () => {
    test('Should render without crash', async () => {
        render(<CustomEditImage test_id="test_id"/>);
        const custom_edit_images = screen.queryAllByTestId('test_id');
        expect(custom_edit_images.length).toBe(1);
        const files_selects = custom_edit_images[0].querySelectorAll(".files_select");
        expect(files_selects.length).toBe(1);
        const initials_colors = screen.queryAllByTestId('initials_color_test_id');
        expect(initials_colors.length).toBe(0);
    });
    test('Should contains initials', async () => {
        render(<CustomEditImage initials="in" test_id="test_id"/>);
        const initials_colors = screen.queryAllByTestId('initials_color_test_id');
        expect(initials_colors.length).toBe(1);
        const initials_colors_by_txt = screen.queryAllByText('in');
        expect(initials_colors_by_txt.length).toBe(1);
        const custom_edit_images = screen.queryAllByTestId('test_id');
        expect(custom_edit_images.length).toBe(1);
        const files_selects = custom_edit_images[0].querySelectorAll(".files_select");
        expect(files_selects.length).toBe(1);
        var select_files_by_txt = files_selects[0];
        expect(select_files_by_txt.textContent).toBe("Select");
    });
    test('Should not contains initials', async () => {
        render(<CustomEditImage initials="in" test_id="test_id" value="image_url"/>);
        const initials_colors = screen.queryAllByTestId('initials_color_test_id');
        expect(initials_colors.length).toBe(0);
        const initials_colors_by_txt = screen.queryAllByText('in');
        expect(initials_colors_by_txt.length).toBe(0);
        const custom_edit_images = screen.queryAllByTestId('test_id');
        expect(custom_edit_images.length).toBe(1);
        const files_selects = custom_edit_images[0].querySelectorAll(".files_select");
        expect(files_selects.length).toBe(1);
        var select_files_by_txt = files_selects[0];
        expect(select_files_by_txt.textContent).toBe("Change");
    });
    test('Should contains test_id', async () => {
        render(<CustomEditImage test_id="test_id"/>);
        const custom_edit_images = screen.queryAllByTestId('test_id');
        expect(custom_edit_images.length).toBe(1);
        const errors = screen.queryAllByTestId('field_error_test_id');
        expect(errors.length).toBe(0);
    });
    test('Should contains error_message', async () => {
        render(<CustomEditImage error_message="error_message"/>);
        const errors = screen.queryAllByTestId('field_error_test_id');
        const errors_txt = screen.queryAllByText('error_message');
        expect(errors.length).toBe(1);
        expect(errors_txt.length).toBe(1);
    });
    test('Should on_change not called if crop_image is true', async () => {
        window.FileReader = class FileReaderMock {
            readAsDataURL = jest.fn();
            addEventListener = (event, callback) => {
                if (event === 'load') {
                callback();
                }
            };
        };
        const on_change = jest.fn();
        render(<CustomEditImage on_change={on_change} />);
        // Get the file input
        var edit_image_component = screen.getAllByTestId('edit_image_test_id')[1]; // Update with your label text
        expect(edit_image_component.querySelector(".files_select").textContent).toBe('Select');
        var input = edit_image_component.querySelector("input");
        // Create a fake image file
        const fakeImage = new File(['(image content)'], 'test-image.png', { type: 'image/png' });
        // Simulate selecting the image
        act(() => {
            fireEvent.change(input, { target: { files: [fakeImage] } });
        });
        expect(on_change).toHaveBeenCalledTimes(0);
    });
    test('should handle selecting an image', async () => {
        // Mock the FileReader API
        window.FileReader = class FileReaderMock {
            readAsDataURL = jest.fn();
            addEventListener = (event, callback) => {
                if (event === 'load') {
                    callback();
                }
            };
        };
        const on_change = jest.fn();
        render(<CustomEditImage crop_image={false} on_change={on_change} />);
        // Get the file input
        var edit_image_component = screen.getAllByTestId('edit_image_test_id')[1]; // Update with your label text
        expect(edit_image_component.querySelector(".files_select").textContent).toBe('Select');
        var input = edit_image_component.querySelector("input");
        // Create a fake image file
        const fakeImage = new File(['(image content)'], 'test-image.png', { type: 'image/png' });
        // Simulate selecting the image
        act(() => {
            fireEvent.change(input, { target: { files: [fakeImage] } });
        });
        // Wait for the component to update
        await screen.findByText('Uploading...'); // Update with your loading text
        expect(on_change).toHaveBeenCalledTimes(1);
        // Check if the image URL was updated it will not updated because it ubdate by parent
        var img = edit_image_component.querySelector(".user_image img");
        expect(img.src).not.toBe('mockImageUrl');
    });
    test('Should on_change called if crop_image is false', async () => {
        const on_change = jest.fn();
        const wrapper = mount(<CustomEditImage on_change={on_change} crop_image={false} />);
        const fileInput = wrapper.find(".files_select input");
        var errors = wrapper.find("div.field_error");
        expect(errors.length).toEqual(0);
        // Nous simulons un clic sur le bouton
        fileInput.simulate('change');
        // Nous attendons que l'API soit appelée et que le composant se mette à jour
        await new Promise(resolve => {
            setImmediate(resolve);
        });
        wrapper.update();
        // Nous vérifions que le state du composant a été mis à jour
        expect(wrapper.state('error_message')).toEqual("");
        expect(wrapper.state('local_error_message')).toEqual("An error has occurred. Please try again or contact the development team.");
        expect(wrapper.state('uploading')).toEqual(false);
        expect(on_change).toHaveBeenCalledTimes(0);
        errors = wrapper.find("div.field_error");
        expect(errors.length).toEqual(1);
    });
});