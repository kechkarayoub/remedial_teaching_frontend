import { colors } from "assets/variables/colors";


describe('Colors objects', () => {
    test('Test number of keys', async () => {
        expect(Object.keys(colors).length).toBe(5);
    });
  
    test("Test key's values", async () => {
        expect(colors.default_color).toBe("#1fa1cf");
        expect(colors.orange).toBe("#f27046");
        expect(colors.primary).toBe("#80c9ca");
        expect(colors.secondary).toBe("#3eb6ad");
        expect(colors.white).toBe("#fff");
    });
});


