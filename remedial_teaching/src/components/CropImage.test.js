import CropImage from "components/CropImage";
import fetchMock from 'jest-fetch-mock';
import testImage from "assets/img/tests/test_image.png";
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { jpeg_data_url } from "utils/tests_utils";

jest.mock('axios');

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
}));

describe('CropImage component', () => {
    beforeAll(() => {
      fetchMock.enableMocks();
    });
  
    afterEach(() => {
      fetchMock.resetMocks();
    });
    test('Should render without crash', async () => {
        render(<CropImage image_url="image_url"/>);
        const validate_buttons = screen.queryAllByText('Confirm');
        expect(validate_buttons.length).toBe(1);
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
        render(<CropImage text={"Button"} on_remove={on_remove} image_url={testImage}/>);
        const close_icon = screen.getByTestId('crop_image_remove_icon_test_id');
        fireEvent.click(close_icon, {target: {}});
        expect(on_remove).toHaveBeenCalledTimes(1);
    });
    test('Should contains error_message', async () => {
        const on_change = jest.fn();
        const wrapper = render(<CropImage text={"Button"} on_change={on_change} raise_error={true} image_url={"https://cdn-icons-png.flaticon.com/512/1040/1040238.png"}/>);
        const imageElement = wrapper.getByTestId('image_to_crop_test_id');
        expect(imageElement.src).toContain('https://cdn-icons-png.flaticon.com/512/1040/1040238.png');
        const button = wrapper.getByTestId('confirm_button_test_id');
        var errors = wrapper.queryAllByTestId('field_error_test_id');
        var loadings = wrapper.queryAllByTestId('loading_css_test_id');
        expect(errors).toHaveLength(0);
        expect(loadings).toHaveLength(0);
        // Nous simulons un clic sur le bouton
        fireEvent.click(button)
        errors = wrapper.queryAllByTestId('field_error_test_id');
        expect(errors).toHaveLength(1);
        loadings = wrapper.queryAllByTestId('loading_css_test_id');
        expect(loadings).toHaveLength(0);
        expect(on_change).toHaveBeenCalledTimes(0);
    });
    
    test('should crop and generate an image', async () => {
      const on_change = jest.fn();
      // Mock FileReader
      const mockFileReader = {
        readAsDataURL: jest.fn(),
        result: jpeg_data_url,
        onloadend: null,
      };
      window.FileReader = jest.fn(() => mockFileReader);
      // Mock canvas methods
      HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
        drawImage: jest.fn(),
      }));
      // Mock toBlob method
      HTMLCanvasElement.prototype.toBlob = jest.fn((callback, type, quality) => {
        callback(new Blob());
      });
      // Render the component
      render(<CropImage image_url="image_url"  on_change={on_change} do_not_compress_image={true} />);
      // Simulate image load
      const imageElement = screen.getByTestId('image_to_crop_test_id');
      act(() => {
        fireEvent.load(imageElement);
      });
      // Wait for image processing to complete
      await waitFor(() => {
        expect(HTMLCanvasElement.prototype.toBlob).toHaveBeenCalled();
      });
      // Simulate FileReader's onloadend
      act(() => {
        mockFileReader.onloadend(); // Simulate FileReader's onloadend event
      });
      // Simulate cropping
      const button = screen.getByTestId('confirm_button_test_id');
      fireEvent.click(button);
      await waitFor(async () => {
        expect(on_change).toHaveBeenCalledTimes(1);
      });
    });
});
