import LdsSpinner from "./LdsSpinner";
import { render } from '@testing-library/react';
 
describe('LdsSpinner component', () => {
  test('Should render without crash', async () => {
    render(<LdsSpinner/>);
  });
});