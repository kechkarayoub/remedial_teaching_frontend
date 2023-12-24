import CustomTSNotice from "components/forms_fields/CustomTSNotice";
import { render } from '@testing-library/react';

jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 

describe('CustomTSNotice component', () => {
    test('Should render without crash', async () => {
        render(<CustomTSNotice />);
    });
});