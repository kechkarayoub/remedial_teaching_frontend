import CropImage from "components/CropImage";
import i18next from 'i18n_init';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
jest.mock('axios');
jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
}));
describe('CropImage component', () => {
    test('Should render without crash', async () => {
        render(<CropImage image_url="image_url"/>);
        const validate_buttons = screen.queryAllByTestId('crop_validation_button_test_id');
        const validate_buttons2 = screen.queryAllByText('Confirm');
        expect(validate_buttons.length).toBe(1);
        expect(validate_buttons2.length).toBe(1);
    });
    test('Should remove icon not showed when on_remove function and image_url are null', async () => {
        render(<CropImage text={"Button"}/>);
        const close_icons = screen.queryAllByTestId('crop_image_remove_icon_test_id');
        expect(close_icons.length).toBe(0);
    });
    test('Should remove icon not showed when on_remove function is null', async () => {
        render(<CropImage text={"Button"} image_url="image_url"/>);
        const close_icons = screen.queryAllByTestId('crop_image_remove_icon_test_id');
        expect(close_icons.length).toBe(0);
    });
    test('Should remove icon not showed when image_url is null', async () => {
        const on_remove = jest.fn();
        render(<CropImage text={"Button"} on_remove={on_remove}/>);
        const close_icons = screen.queryAllByTestId('crop_image_remove_icon_test_id');
        expect(close_icons.length).toBe(0);
    });
    test('Should remove icon showed when image_url and on_remove are not null', async () => {
        const on_remove = jest.fn();
        render(<CropImage text={"Button"} on_remove={on_remove} image_url="image_url"/>);
        const close_icons = screen.queryAllByTestId('crop_image_remove_icon_test_id');
        expect(close_icons.length).toBe(1);
    });
    test('Should on_remove called when clicking on remove icon', async () => {
        const on_remove = jest.fn();
        render(<CropImage text={"Button"} on_remove={on_remove} image_url="image_url"/>);
        const close_icon = screen.getByTestId('crop_image_remove_icon_test_id');
        fireEvent.click(close_icon, {target: {}});
        expect(on_remove).toHaveBeenCalledTimes(1);
    });
    test('Should contains error_message', async () => {
        const on_change = jest.fn();
        const wrapper = mount(<CropImage text={"Button"} on_change={on_change} raise_error={true} is_test={true} image_url="image_url"/>);
        const button = wrapper.find(".validate_div .validate");
        var errors = wrapper.find("div.field_error");
        expect(errors.length).toEqual(0);
        // Nous simulons un clic sur le bouton
        button.simulate('click');

        // Nous attendons que l'API soit appelée et que le composant se mette à jour
        await new Promise(resolve => {
            setImmediate(resolve);
        });
        wrapper.update();
        // Nous vérifions que le state du composant a été mis à jour
        expect(wrapper.state('error_message')).toEqual("An error has occurred. Please try again or contact the development team.");
        expect(wrapper.state('uploading')).toEqual(false);
        expect(on_change).toHaveBeenCalledTimes(0);
        errors = wrapper.find("div.field_error");
        expect(errors.length).toEqual(1);
    });
    test('Should call on_change', async () => {
        const on_change = jest.fn();
        const wrapper = mount(<CropImage text={"Button"} on_change={on_change} is_test={true} image_url="image_url"/>);
        const button = wrapper.find(".validate_div .validate");
        // Nous simulons un clic sur le bouton
        button.simulate('click');

        // Nous attendons que l'API soit appelée et que le composant se mette à jour
        await new Promise(resolve => {
            setImmediate(resolve);
        });
        wrapper.update();
        // Nous vérifions que le state du composant a été mis à jour
        expect(wrapper.state('error_message')).toEqual("");
        expect(on_change).toHaveBeenCalledTimes(1);
    });
});