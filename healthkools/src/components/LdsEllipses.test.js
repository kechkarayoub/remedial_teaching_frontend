import LdsEllipses from "components/LdsEllipses";
import { render } from '@testing-library/react';
 
describe('LdsEllipses component', () => {
  test('Should render without crash', async () => {
    render(<LdsEllipses/>);
  });
});
