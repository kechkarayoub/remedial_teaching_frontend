import BlocFeeds from "./BlocFeeds";
import { render } from '@testing-library/react';
import i18next from '../../../i18n_init';
 
describe('BlocFeeds component', () => {
    test('Should render without crash', async () => {
        render(<BlocFeeds i18n={i18next}/>)
    });
});