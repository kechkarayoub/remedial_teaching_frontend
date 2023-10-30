import BlocFeeds from "pages/home/components/BlocFeeds";
import i18next from 'i18n_init';
import { render } from '@testing-library/react';
 
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
