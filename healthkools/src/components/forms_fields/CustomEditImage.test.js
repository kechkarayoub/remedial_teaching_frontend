import CustomEditImage from "components/forms_fields/CustomEditImage";
import i18next from 'i18n_init';
import { fireEvent, render, screen } from '@testing-library/react';
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
        const on_change = jest.fn();
        const wrapper = mount(<CustomEditImage on_change={on_change} raise_error={true} is_test={true} />);
        const button = wrapper.find(".files_select input");
        var errors = wrapper.find("div.field_error");
        expect(errors.length).toEqual(0);
        var crop_image_containers = wrapper.find("div.crop_image_container");
        expect(crop_image_containers.length).toEqual(0);
        // Nous simulons un clic sur le bouton
        button.simulate('change');

        // Nous attendons que l'API soit appelée et que le composant se mette à jour
        await new Promise(resolve => {
            setImmediate(resolve);
        });
        wrapper.update();
        // Nous vérifions que le state du composant a été mis à jour
        expect(wrapper.state('error_message')).toEqual("");
        expect(wrapper.state('local_error_message')).toEqual("");
        expect(wrapper.state('uploading')).toEqual(false);
        expect(on_change).toHaveBeenCalledTimes(0);
        errors = wrapper.find("div.field_error");
        expect(errors.length).toEqual(0);
        crop_image_containers = wrapper.find("div.crop_image_container");
        expect(crop_image_containers.length).toEqual(1);
        //...
    });
    test('Should on_change called if crop_image is false', async () => {
        const on_change = jest.fn();
        const wrapper = mount(<CustomEditImage on_change={on_change} crop_image={false} raise_error={true} is_test={true} />);
        const button = wrapper.find(".files_select input");
        var errors = wrapper.find("div.field_error");
        expect(errors.length).toEqual(0);
        // Nous simulons un clic sur le bouton
        button.simulate('change');

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
    // test('Should contains image_url', async () => {
    //     render(<CustomEditImage image_url="http://localhost/image_url"/>);
    //     const image = screen.getByRole('img');
    //     expect(image.src).toBe("http://localhost/image_url");
    // });
    // test('Should remove icon not appear if not image_url and not on_remove props', async () => {
    //     render(<CustomEditImage/>);
    //     const remove_icons = screen.queryAllByTestId('user_image_remove_icon_test_id');
    //     expect(remove_icons.length).toBe(0);
    // });
    // test('Should remove icon not appear if not image_url and on_remove props', async () => {
    //     const on_remove = jest.fn();
    //     render(<CustomEditImage on_remove={on_remove}/>);
    //     const remove_icons = screen.queryAllByTestId('user_image_remove_icon_test_id');
    //     expect(remove_icons.length).toBe(0);
    // });
    // test('Should remove icon not appear if image_url and not on_remove props', async () => {
    //     render(<CustomEditImage image_url={"image_url"}/>);
    //     const remove_icons = screen.queryAllByTestId('user_image_remove_icon_test_id');
    //     expect(remove_icons.length).toBe(0);
    // });
    // test('Should remove icon appear if image_url and on_remove props', async () => {
    //     const on_remove = jest.fn();
    //     render(<CustomEditImage on_remove={on_remove} image_url={"image_url"}/>);
    //     const remove_icons = screen.queryAllByTestId('user_image_remove_icon_test_id');
    //     expect(remove_icons.length).toBe(1);
    // });
    // test('On_click should not called on clicking on remove icon but on_remove should called', async () => {
    //     const on_click = jest.fn();
    //     const on_remove = jest.fn();
    //     render(<CustomEditImage on_click={on_click} on_remove={on_remove} image_url="image_url"/>);
    //     const remove_icon = screen.getByTestId('user_image_remove_icon_test_id');
    //     const image = screen.getByRole('img');
    //     expect(on_click).toHaveBeenCalledTimes(0);
    //     expect(on_remove).toHaveBeenCalledTimes(0);
    //     fireEvent.click(remove_icon, {target: {}});
    //     expect(on_click).toHaveBeenCalledTimes(0);
    //     expect(on_remove).toHaveBeenCalledTimes(1);
    //     fireEvent.click(image, {target: {}});
    //     expect(on_click).toHaveBeenCalledTimes(1);
    //     expect(on_remove).toHaveBeenCalledTimes(1);
    // });
    // test('On_click should called on click', async () => {
    //     const on_click = jest.fn();
    //     render(<CustomEditImage on_click={on_click}/>);
    //     const image = screen.getByRole('img');
    //     expect(on_click).toHaveBeenCalledTimes(0);
    //     fireEvent.click(image, {target: {}});
    //     expect(on_click).toHaveBeenCalledTimes(1);
    // });
});