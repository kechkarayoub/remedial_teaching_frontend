import UserImage from "components/UserImage";
import { fireEvent, render, screen } from '@testing-library/react';
import i18next from 'i18n_init';
 
describe('UserImage component', () => {
    test('Should render without crash', async () => {
        render(<UserImage i18n={i18next}/>);
    });
    test('Should contains test_id', async () => {
        render(<UserImage i18n={i18next} test_id="test_id"/>);
        const image_containers = screen.getAllByTestId('test_id');
        expect(image_containers.length).toBe(1);
    });
    test('Should contains image_url', async () => {
        render(<UserImage i18n={i18next} image_url="http://localhost/image_url"/>);
        const image = screen.getByRole('img');
        expect(image.src).toBe("http://localhost/image_url");
    });
    test('Should remove icon not appear if not image_url and not on_remove props', async () => {
        render(<UserImage i18n={i18next}/>);
        const remove_icons = screen.queryAllByTestId('user_image_remove_icon_test_id');
        expect(remove_icons.length).toBe(0);
    });
    test('Should remove icon not appear if not image_url and on_remove props', async () => {
        const on_remove = jest.fn();
        render(<UserImage i18n={i18next} on_remove={on_remove}/>);
        const remove_icons = screen.queryAllByTestId('user_image_remove_icon_test_id');
        expect(remove_icons.length).toBe(0);
    });
    test('Should remove icon not appear if image_url and not on_remove props', async () => {
        render(<UserImage i18n={i18next} image_url={"image_url"}/>);
        const remove_icons = screen.queryAllByTestId('user_image_remove_icon_test_id');
        expect(remove_icons.length).toBe(0);
    });
    test('Should remove icon appear if image_url and on_remove props', async () => {
        const on_remove = jest.fn();
        render(<UserImage i18n={i18next} on_remove={on_remove} image_url={"image_url"}/>);
        const remove_icons = screen.queryAllByTestId('user_image_remove_icon_test_id');
        expect(remove_icons.length).toBe(1);
    });
    test('On_click should not called on clicking on remove icon but on_remove should called', async () => {
        const on_click = jest.fn();
        const on_remove = jest.fn();
        render(<UserImage i18n={i18next} on_click={on_click} on_remove={on_remove} image_url="image_url"/>);
        const remove_icon = screen.getByTestId('user_image_remove_icon_test_id');
        const image = screen.getByRole('img');
        expect(on_click).toHaveBeenCalledTimes(0);
        expect(on_remove).toHaveBeenCalledTimes(0);
        fireEvent.click(remove_icon, {target: {}});
        expect(on_click).toHaveBeenCalledTimes(0);
        expect(on_remove).toHaveBeenCalledTimes(1);
        fireEvent.click(image, {target: {}});
        expect(on_click).toHaveBeenCalledTimes(1);
        expect(on_remove).toHaveBeenCalledTimes(1);
    });
    test('On_click should called on click', async () => {
        const on_click = jest.fn();
        render(<UserImage i18n={i18next} on_click={on_click}/>);
        const image = screen.getByRole('img');
        expect(on_click).toHaveBeenCalledTimes(0);
        fireEvent.click(image, {target: {}});
        expect(on_click).toHaveBeenCalledTimes(1);
    });
});