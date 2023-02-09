import {images, flags} from "components/_resources";
 
describe('src/components/_ressources.js test', () => {
    test('Images object should have 1 item', async () => {
        expect(Object.keys(images).length).toBe(1);
    });
    test('Flags object should have 3 items', async () => {
        expect(Object.keys(flags).length).toBe(3);
    });
});