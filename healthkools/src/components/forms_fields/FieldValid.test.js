import FieldValid from "./FieldValid";
import { render, screen } from '@testing-library/react';
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('FieldValid component', () => {
    test('Should render without crash', async () => {
        render(<FieldValid />);
    });
    test('Should contains valid message', async () => {
        const { container } = render(<FieldValid valid_message="valid_message" />);
        const field_valid = container.getElementsByClassName('field_valid')[0];
        expect(field_valid.textContent).toBe('valid_message');
    });
});