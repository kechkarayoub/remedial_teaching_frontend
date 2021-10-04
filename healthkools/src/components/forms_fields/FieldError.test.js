import FieldError from "./FieldError";
import { render, screen } from '@testing-library/react';
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('FieldError component', () => {
    test('Should render without crash', async () => {
        render(<FieldError />);
    });
    test('Should contains error message', async () => {
        const { container } = render(<FieldError error_message="error_message" />);
        const field_error = container.getElementsByClassName('field_error')[0];
        expect(field_error.textContent).toBe('error_message');
    });
});