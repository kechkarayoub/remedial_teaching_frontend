import HKTSNotice from "./HKTSNotice";
import { render, screen, fireEvent } from '@testing-library/react';
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('HKTSNotice component', () => {
    test('Should render without crash', async () => {
        render(<HKTSNotice />);
    });
});