import BlocFeeds from "./BlocFeeds";
import { render } from '@testing-library/react';
import i18next from '../../../i18n_init';
 
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
  }));
describe('BlocFeeds component', () => {
    test('Should render without crash', async () => {
        render(<BlocFeeds i18n={i18next}/>)
    });
});