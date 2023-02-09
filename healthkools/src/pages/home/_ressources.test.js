import {images} from "pages/home/_resources";
 
describe('src/components/_ressources.js test', () => {
    test('Images object should have 3 items', async () => {
        expect(Object.keys(images).length).toBe(3);
    });
});