import LoadingAssets from "./LoadingAssets";
import { render } from '@testing-library/react';
 
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('LoadingAssets component', () => {
    test('Should render without crash', async () => {
        render(<LoadingAssets/>);
    });
});